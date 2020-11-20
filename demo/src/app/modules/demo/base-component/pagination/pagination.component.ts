import { Component } from '@angular/core';
import { Pagination, requestObject } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {

    inputs = [
        ['pagination', 'Pagination', `page data`],
        ['btnNum', 'number', 'show button number, default value is 5'],
        ['items', 'Item[]', 'row number select item'],
        ['goTitle', 'string', 'go button tilte']
    ];

    outputs = [
        ['pageChange', 'Pagination', 'page change callback']
    ];

    page = new Pagination(100);

    examplePage = new Pagination();

    data = [];

    constructor() {
        this.loadData(this.examplePage);
    }

    loadData(event: Pagination) {
        requestObject(`https://randomuser.me/api/?page=${event.page}&results=${event.limit}`).subscribe(res => {
            this.examplePage.total = 1000;
            this.data = res.results.map(user => ({
                nick: user.name.first,
                email: user.email
            }));
        });
    }
}
