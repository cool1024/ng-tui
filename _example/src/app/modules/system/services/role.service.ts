import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role, RoleGroup } from '../interfaces/role.interface';
import { PermissionGroupItem, PermissionGroup, Permission } from '../interfaces/permission.interface';


@Injectable()
export class RoleService {

    constructor(private request: RequestService) { }

    /**
     * 获取角色组树
     * @return {Observable<RoleGroup[]>}
     */
    getRoleGroups(rootNode: RoleGroup): Observable<RoleGroup[]> {
        return this.request.url('/managerapi/role/all').pipe(map<ApiData, RoleGroup[]>(res => {
            const roleGroups = new Array<RoleGroup>();
            res.datas = res.datas.map(item => {
                item.permissionIds = JSON.parse(item.permissionIds);
                return item;
            });
            res.datas.filter((role: Role) => role.roleParentId === 0)
                .forEach(role => {
                    roleGroups.push(this.getChildGroups(role, rootNode, res.datas));
                });
            return roleGroups;
        }));
    }

    /**
     * 获取子角色组列表
     * @param {Role} roleParent 父级角色组
     * @param {Role[]} roles 原始角色数组
     * @return {RoleGroup}
     */
    getChildGroups(roleNode: Role, parentNode: RoleGroup, roles: Role[]): RoleGroup {
        const roleGroup = {
            role: roleNode,
            roleChildren: [],
            parentGroup: parentNode
        };
        roleGroup.roleChildren = roles.filter(role => role.roleParentId === roleNode.id)
            .map(role => this.getChildGroups(role, roleGroup, roles));
        return roleGroup;
    }

    /**
     * 添加新角色
     * @param {Role} role 角色数据
     */
    inserRole(role: Role): Observable<ApiData> {
        return this.request.post('/managerapi/role/insert', role);
    }

    /**
     * 更新角色
     * @param {Role} role 角色数据
     */
    updateRole(role: Role): Observable<ApiData> {
        return this.request.put('/managerapi/role/update', role);
    }

    /**
     * 删除角色
     * @param {number} roleId 角色数据
     */
    deleteRole(roleId: number): Observable<ApiData> {
        return this.request.delete('/managerapi/role/delete', { roleId });
    }

    /**
     * 获取角色权限选项
     */
    getPermissionOptions(): Observable<PermissionGroupItem[]> {
        return this.request.url('/managerapi/role/permission/options')
            .pipe(map(res => {
                const items = new Array<PermissionGroupItem>();
                const groups: PermissionGroup[] = res.datas.groups;
                const permissions: Permission[] = res.datas.permissions;
                groups.forEach(group => {
                    items.push({
                        permissionGroup: group,
                        permissions: permissions.filter(permission => permission.permissionGroupId === group.id)
                    });
                });
                return items;
            }));
    }
}
