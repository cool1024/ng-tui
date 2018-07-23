import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../tui/modules/pagination/pagination.class';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    page = new Pagination(100);

    constructor() { }

    ngOnInit() {
    }

}
