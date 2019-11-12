import { Component, OnInit } from '@angular/core';
import { Pagination, requestString, requestObject } from 'projects/ng-tui/src/public_api';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

    theads: Array<any> = ['项目名称', '描述', '作者', 'Star/Fork', '语言', '操作'];

    constructor() { }

    ngOnInit() {

    }

    dataLoader(page: Pagination) {
        console.log(page);
        return requestObject(`https://api.github.com/search/repositories?q=java&page=${page.page}&per_page=${page.limit}`)
            .pipe(
                map(res => {
                    const total = res.total_count;
                    const data = res.items;
                    console.log(data);
                    return { result: true, total, data };
                })
            );
    }
}
