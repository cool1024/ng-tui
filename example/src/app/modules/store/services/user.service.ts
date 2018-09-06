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
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Pagination } from 'ng-tui';

@Injectable()
export class UserService {

    constructor(private request: RequestService) { }

    /**
     * 查询平台管理员，分页
     */
    searchUser(pagination: Pagination, search: SearchParams): Observable<ApiData> {
        return this.request.get('/store/user/search', pagination.getpageDataWith(search.values));
    }

    /**
     * 获取指定用户
     */
    getUser(userId: number): Observable<ApiData> {
        return this.request.get('/store/user/get', { userId });
    }

    /**
     * 更新用户信息
     */
    updateUser(user: User): Observable<ApiData> {
        return this.request.put('/store/user/update', user);
    }

    /**
     * 获取会员等级下拉
     */
    userLevelOptions(): Observable<ApiData> {
        return this.request.url('/store/user/level/options');
    }
}
