import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { Menu, MenuGroup } from '../interfaces/menu.interface';


@Injectable()
export class MenuService {

    constructor(private request: RequestService) { }

    getAllMenu(): Observable<ApiData> {
        return this.request.url('/managerapi/menu/all');
    }

    insertMenuGroup(menuGroup: MenuGroup): Observable<ApiData> {
        return this.request.post('/managerapi/menu/group/insert', menuGroup);
    }

    updateMenuGroup(menuGroup: MenuGroup): Observable<ApiData> {
        return this.request.put('/managerapi/menu/group/update', menuGroup);
    }

    sortMenuGroup(ids: number[]) {
        return this.request.put('/managerapi/menu/group/sort', { ids });
    }

    insertMenu(menu: Menu): Observable<ApiData> {
        return this.request.post('/managerapi/menu/insert', menu);
    }

    updateMenu(menu: Menu): Observable<ApiData> {
        menu.permissionId = menu.permissionId || 0;
        return this.request.put('/managerapi/menu/update', menu);
    }

    getPermissionOptions(): Observable<ApiData> {
        return this.request.url('/managerapi/menu/permission/options');
    }

    deleteMenu(menuId: number) {
        return this.request.delete('/managerapi/menu/delete', { menuId });
    }

    deleteMenuGroup(menuGroupId: number) {
        return this.request.delete('/managerapi/menu/group/delete', { menuGroupId });
    }

    sortMenu(ids: number[]) {
        return this.request.put('/managerapi/menu/sort', { ids });
    }
}
