import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../cores/services';
import { Pagination } from 'ng-tui';
import { OrderService } from '../../services/order.service';
import { SearchParams } from '../../../../cores/classes';
import { Order } from '../../interfaces/order.interface';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {


    loading = false;

    pagination = new Pagination();

    search = new SearchParams({ start: '', end: '' }, -1);

    list = new Array<Order>();

    constructor(
        public global: GlobalService,
        private orderService: OrderService
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    doSearch() {
        this.pagination.reset();
        this.loadDatas();
    }

    doReset() {
        const status = this.search.params.status || -1;
        this.search.clean();
        this.search.params.status = status;
        this.doSearch();
    }

    changeSearchStatus(statusLabel: string) {
        this.search.clean();
        switch (statusLabel) {
            case '待发货': {
                this.search.params.status = 2;
                break;
            }
            case '已发货': {
                this.search.params.status = 3;
                break;
            }
            case '已完成': {
                this.search.params.status = 4;
                break;
            }
            default: {
                this.search.params.status = -1;
            }
        }
        this.doSearch();
    }

    loadDatas() {
        this.loading = true;
        this.orderService.searchOrder(this.pagination, this.search).subscribe({
            next: res => {
                this.pagination.total = res.datas.total;
                this.list = res.datas.rows;
            },
            complete: () => this.loading = false
        });
    }
}
