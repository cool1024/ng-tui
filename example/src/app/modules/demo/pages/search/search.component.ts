import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Item } from 'ng-tui';
import { RequestService } from '../../../../cores/services';
import { ApiData } from '../../../../cores/classes';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    value = 0;

    values = new Array<Item>();

    constructor(private request: RequestService) { }

    /**
       * 从服务器查询需要的选项
       * @param key 查询关键词
       */
    doSearch = (key: string): Observable<Item[]> => {
        // return of(['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        //     'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        //     'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
        //     'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
        //     'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
        //     'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
        //     'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
        //     'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
        //     'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
        //     'Zagreb', 'Zaragoza', 'Łódź']).pipe(
        //         delay(500),
        //         map<string[], Item[]>(datas => {
        //             // tslint:disable-next-line:no-bitwise
        //             return datas.filter(data => ~data.indexOf(key)).map(data => {
        //                 return { value: data, text: data };
        //             });
        //         })
        //     );

        return this.request.get('/store/user/search', { limit: 20, offset: 0, nick: key }).pipe(
            map<ApiData, Item[]>(res => res.datas.rows.map(row => ({
                value: row.id,
                text: row.nick,
                content: `<img class="rounded-circle mr-2" width="30" src="${row.avatar}">${row.nick}`
            })))
        );

        // this.userService.searchUser(this.pagination, this.search).subscribe({
        //     next: res => {
        //         this.pagination.total = res.datas.total;
        //         this.list = res.datas.rows;
        //     },
        //     complete: () => this.loading = false
        // });
    }
}
