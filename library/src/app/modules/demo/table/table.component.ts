import { Component, OnInit } from '@angular/core';
import { Pagination, requestObject, TableHeader } from 'projects/ng-tui/src/public_api';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

    theads: Array<TableHeader | string> = ['No.', 'User', 'Link', 'Time', 'Opt'];

    constructor() { }

    ngOnInit() {

    }

    dataLoader(page: Pagination) {
        console.log(page);
        // `https://api.github.com/search/repositories?q=java&page=${page.page}&per_page=${page.limit}`

        return requestObject(`https://randomuser.me/api/?page=${page.page}&results=${page.limit}`)
            .pipe(
                map(res => {
                    const total = 1000;
                    const data = res.results.map(user => ({
                        avatar: user.picture.thumbnail,
                        nick: user.name.first,
                        email: user.email,
                        gender: user.gender,
                        cell: user.cell,
                        phone: user.phone,
                        address: `${user.location.city} ${user.location.street}`,
                        registered: user.registered
                    }));
                    console.log(data);
                    return { result: true, total, data };
                })
            );
    }
}
