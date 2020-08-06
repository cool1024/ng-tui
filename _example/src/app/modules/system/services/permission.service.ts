import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionGroupItem, PermissionGroup, Permission } from '../interfaces/permission.interface';


@Injectable()
export class PermissionService {

    constructor(private request: RequestService) { }

    getAllPermission(): Observable<PermissionGroupItem[]> {
        return this.request.url('/managerapi/permission/all').pipe(
            map<ApiData, PermissionGroupItem[]>(res => {
                const permissionGroupItems = new Array<PermissionGroupItem>();
                const permissionGroups = res.datas.groups;
                const permissions = res.datas.permissions;
                permissionGroups.forEach(item => {
                    permissionGroupItems.push({
                        permissionGroup: item,
                        permissions: permissions.filter(permission => permission.permissionGroupId === item.id),
                        open: false
                    });
                });
                return permissionGroupItems;
            })
        );
    }

    insertPermissionGroup(permissionGroup: PermissionGroup): Observable<ApiData> {
        return this.request.post('/managerapi/permission/group/insert', permissionGroup);
    }

    updatePermissionGroup(permissionGroup: PermissionGroup): Observable<ApiData> {
        return this.request.put('/managerapi/permission/group/update', permissionGroup);
    }

    deletePermissionGroup(permissionGroupId: number): Observable<ApiData> {
        return this.request.delete('/managerapi/permission/group/delete', { permissionGroupId });
    }

    insertPermission(permission: Permission): Observable<ApiData> {
        return this.request.post('/managerapi/permission/insert', permission);
    }

    updatePermission(permission: Permission): Observable<ApiData> {
        return this.request.put('/managerapi/permission/update', permission);
    }

    deletePermission(permissionId: number): Observable<ApiData> {
        return this.request.delete('/managerapi/permission/delete', { permissionId });
    }
}
