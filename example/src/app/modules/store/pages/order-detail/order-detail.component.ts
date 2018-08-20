import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ApiData } from '../../../../cores/classes';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

    order: any = { user: {} };

    constructor(
        private active: ActivatedRoute,
        private orderService: OrderService,
    ) {
        this.active.paramMap
            .pipe(switchMap<ParamMap, ApiData>(params => this.orderService.getOrder(parseInt(params.get('id'), 10))))
            .subscribe(res => this.order = res.datas);
    }

    ngOnInit() {
    }

}
