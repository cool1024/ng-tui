import { Injectable } from '@angular/core';
import { RequestService } from '../../../cores/services/request.service';
import { ApiData } from '../../../cores/classes/api-data.class';
import { SearchParams } from '../../../cores/classes/search-params';
import { PlatformManager } from '../interfaces/platform.interfaces';
import { Observable } from 'rxjs';
import { Pagination } from 'ng-tui';

@Injectable()
export class PlatformService {

    constructor(private request: RequestService) { }

    /**
     * 查询平台管理员，分页
     */
    searchPlatformManager(pagination: Pagination, search: SearchParams): Observable<ApiData> {
        return this.request.get('/admin/platform/search', pagination.getpageDataWith(search.values));
    }
    /**
    * 获取指定平台管理员
    */
    getPlatformManager(platformManagerId: number): Observable<ApiData> {
        return this.request.get('/admin/platform/get', { platformManagerId });
    }

    /**
     * 请求添加新平台管理员
     */
    insertPlatformManager(platformManager: PlatformManager): Observable<ApiData> {
        return this.request.post('/admin/platform/insert', platformManager);
    }

    /**
     * 更新平台管理员信息
     */
    updatePlatformManager(platformManager: PlatformManager): Observable<ApiData> {
        return this.request.put('/admin/platform/update', platformManager);
    }

    /**
     * 删除平台管理员信息
     */
    deletePlatformManager(platformManagerId: number): Observable<ApiData> {
        return this.request.delete('/admin/platform/delete', { platformManagerId });
    }
}
