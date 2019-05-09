import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData, SearchParams } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { Manager } from '../interfaces/manager.interface';
import { Pagination, Item } from 'ng-tui';
import { map } from 'rxjs/operators';


@Injectable()
export class ManagerService {

    constructor(private request: RequestService) { }

    getManagerInfo(): Observable<ApiData> {
        return this.request.url('/managerapi/info');
    }

    updateManagerInfo(manager: Manager): Observable<ApiData> {
        return this.request.put('/managerapi/update', manager);
    }

    uplodaAvatar(file: File): Observable<string> {
        return this.request.ossUpload('/managerapi/avatar/access', file);
    }

    getManagerList(page: Pagination, search: SearchParams): Observable<ApiData> {
        return this.request.get('/managerapi/account/search', page.getPageDataWith(search.values));
    }

    addManagerAccount(manager: Manager): Observable<ApiData> {
        return this.request.post('/managerapi/signup', manager);
    }

    updateManagerAccount(manager: Manager): Observable<ApiData> {
        return this.request.put('/managerapi/account/update', manager);
    }

    deleteManagerAccount(id: number): Observable<ApiData> {
        return this.request.delete('/managerapi/account/delete', { id });
    }

    /**
     * 获取所有角色下拉列表
     * @return {Observable<RoleGroup[]>}
     */
    getRoleOptions(): Observable<Item[]> {
        return this.request.url('/managerapi/role/all').pipe(
            map<ApiData, Item[]>(res =>
                res.datas.map(role => ({
                    value: role.id,
                    text: role.roleName
                }))
            ));
    }

}
