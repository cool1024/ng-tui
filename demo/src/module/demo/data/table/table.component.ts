import { Component } from '@angular/core';
import { Pagination, requestObject, ToastService, ConfirmService } from 'ng-tui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    theads: Array<string> = ['No.', 'User', 'Link', 'Time', 'Opt'];

    constructor(private confirm: ConfirmService, private toast: ToastService) {}

    deleteItem(itemIndex: number): void {
        this.confirm.danger('Warning', 'Are you sure?').subscribe((isOk: boolean) => {
            console.log('delete item index => ', itemIndex);
            if (isOk) {
                this.toast.success('Delete Success', 'It`s just a test, no one will be delete');
            }
        });
    }

    dataLoader(page: Pagination): Observable<any> {
        console.log(page);
        // `https://api.github.com/search/repositories?q=java&page=${page.page}&per_page=${page.limit}`
        // requestObject(`https://api.github.com/search/repositories?q=java&page=${page.page}&per_page=${page.limit}`)
        //     .pipe(map(res => ({

        //     })));
        return requestObject(`https://randomuser.me/api/?seed=cool1024&page=${page.page}&results=${page.limit}`).pipe(
            map((res) => {
                const total = 1000;
                const data = res.results.map((user: any) => ({
                    id: user.id.value,
                    avatar: user.picture.thumbnail,
                    nick: user.name.first,
                    email: user.email,
                    gender: user.gender,
                    cell: user.cell,
                    phone: user.phone,
                    address: `${user.location.city} , ${user.location.country}`,
                    registered: user.registered,
                }));
                return { result: true, total, data };
            })
        );
    }
}
