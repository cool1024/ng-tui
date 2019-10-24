import { Component, OnInit } from '@angular/core';
import { Pagination } from 'ng-tui';
import { GlobalService } from '../../../../cores/services';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

    page = new Pagination(100);

    constructor(public global: GlobalService) { }
}
