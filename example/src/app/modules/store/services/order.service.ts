/**
 * 用户服务
 *
 * @file   UserService.ts
 * @author xiaojian
 * @date   2018-04-22
 */
import { Injectable } from '@angular/core';
import { RequestService } from '../../../cores/services/request.service';
import { ApiData } from '../../../cores/classes/api-data.class';
import { SearchParams } from '../../../cores/classes/search-params';
// import { Goods } from '../interfaces/goods.interface';
import { Observable } from 'rxjs';
import { Pagination } from 'ng-tui';

@Injectable()
export class OrderService {

    constructor(private request: RequestService) { }

    /**
     * 查询订单，分页
     */
    searchOrder(pagination: Pagination, search: SearchParams): Observable<ApiData> {
        return this.request.get('/store/order/search', pagination.getpageDataWith(search.values));
    }

    /**
     * 获取订单详情，分页
     */
    getOrder(orderId: number): Observable<ApiData> {
        return this.request.get('/store/order/get', { orderId });
    }
}
