import { Component, OnInit } from '@angular/core';
import { PermissionGroupItem, PermissionGroup, Permission } from '../../interfaces/permission.interface';
import { ModalService, ConfirmService, ToastService } from 'ng-tui';
import { PermissionModalComponent } from './permission-modal.component';
import { PermissionGroupModalComponent } from './permission-group-modal.component';
import { PermissionService } from '../../services/permission.service';
import { switchMap } from 'rxjs/operators';

@Component({
    templateUrl: './permission-manager.component.html',
    styleUrls: ['./permission-manager.component.scss']
})
export class PermissionManagerComponent implements OnInit {

    permissionGroupItems = new Array<PermissionGroupItem>();

    constructor(
        private modal: ModalService,
        private confirm: ConfirmService,
        private permissionService: PermissionService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        this.loadDatas();
    }

    /**
     * 重新载入数据
     */
    loadDatas() {
        this.permissionService.getAllPermission().subscribe(items => {
            this.permissionGroupItems = items.map(item => Object.assign(item, { open: true }));
        });
    }

    /**
     * 编辑新权限组
     */
    editPermissionGroup(permissionGroup?: PermissionGroup) {
        const modal = this.modal.create(PermissionGroupModalComponent, { center: true });
        modal.instance.permissionGroup = permissionGroup || { id: 0, permissionGroupName: '新权限分组' };
        modal.open().subscribe(() => {
            this.loadDatas();
        });
    }

    /**
     * 删除权限组
     */
    deletePermissionGroup(permissionGroup: PermissionGroup, index: number) {
        this.confirm.danger('确认删除', `您确认要删除分组'${permissionGroup.permissionGroupName}',操作不可恢复！？`)
            .pipe(switchMap(() => this.permissionService.deletePermissionGroup(permissionGroup.id)))
            .subscribe(() => {
                this.permissionGroupItems.splice(index, 1);
                this.toast.success('删除成功', `成功删除分组'${permissionGroup.permissionGroupName}'`);
            });
    }

    /**
     * 编辑新权限
     */
    editPermission(permissionGroup: PermissionGroup, permission?: Permission) {
        const modal = this.modal.create(PermissionModalComponent, { center: true });
        modal.instance.permission = permission || {
            id: 0,
            permissionGroupId: permissionGroup.id,
            permissionName: '新权限',
            permissionKey: 'new-key'
        };
        modal.open().subscribe(() => {
            this.loadDatas();
        });
    }

    /**
     * 删除权限
     */
    deletePermission(permission: Permission) {
        this.confirm.danger('确认删除', `您确认要删除权限'${permission.permissionName}',操作不可恢复！？`)
            .pipe(switchMap(() => this.permissionService.deletePermission(permission.id)))
            .subscribe(() => {
                this.loadDatas();
                this.toast.success('删除成功', `成功删除权限'${permission.permissionName}'`);
            });
    }
}
