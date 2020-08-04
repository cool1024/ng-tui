import { Component, OnInit } from '@angular/core';
import { ModalService, ToastService } from 'ng-tui';
import { Role } from '../../interfaces/role.interface';
import { RoleService } from '../../services/role.service';
import { GlobalService } from '../../../../cores/services';
import { PermissionGroupItem } from '../../interfaces/permission.interface';

@Component({
    template: `
<div class="modal-header">
    <h5 class="modal-title">角色面板</h5>
        <button (click)="modal.dismiss()" type="button" class="close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
    <div class="form-group">
        <label class="col-form-label">上级角色:</label>
        <input [value]="parentRole.roleName" readonly type="text" class="form-control">
    </div>
    <div class="form-group">
        <label class="col-form-label">角色名称:</label>
        <input [(ngModel)]="role.roleName" type="text" class="form-control">
    </div>
    <div class="form-group">
        <label class="col-form-label">权限列表:</label>
        <div *ngFor="let permissionGroupItem of permissionGroupItems" class="border border-muted p-2 mb-1">
            <p>{{permissionGroupItem.permissionGroup.permissionGroupName}}</p>
            <div>
                <ng-container *ngFor="let permission of permissionGroupItem.permissions">
                    <ts-switch
                        [ngModel]="hasPermission(permission.id)!==false"
                        (ngModelChange)="changePermission(permission.id, $event)"
                        [color]="global.params.color"></ts-switch>
                    <span class="ml-1 mr-1 {{hasPermission(permission.id)!==false?'text-'+global.params.color:''}}">
                        {{permission.permissionName}}
                    </span>
                </ng-container>
            </div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <button (click)="modal.dismiss()" type="button" class="btn btn-white">取消</button>
    <button tsBtn loading color="primary" (submit)="confirmSave($event)">确认保存</button>
</div>`,
})
export class RoleModalComponent implements OnInit {

    role: Role;

    parentRole: any;

    permissionGroupItems = new Array<PermissionGroupItem>();

    constructor(
        public modal: ModalService,
        private toast: ToastService,
        private roleService: RoleService,
        public global: GlobalService,
    ) {
        this.roleService.getPermissionOptions()
            .subscribe(permissionGroups => this.permissionGroupItems = permissionGroups);
    }

    ngOnInit() {
        this.role.permissionIds = this.role.permissionIds || [];
    }

    /**
     * 确认保存
     *
     * @param {any} btn
     */
    confirmSave(btn: any) {
        if (this.role.id === 0) {
            this.roleService.inserRole(this.role)
                .subscribe({
                    next: res => {
                        this.toast.success('添加成功', `成功添加角色${this.role.roleName}`);
                        this.modal.close(res.datas);
                    },
                    complete: () => btn.dismiss()
                });
        } else {
            this.roleService.updateRole(this.role)
                .subscribe({
                    next: () => {
                        this.toast.success('修改成功', `成功修改角色${this.role.roleName}`);
                        this.modal.close(this.role);
                    },
                    complete: () => btn.dismiss()
                });
        }
    }

    /**
     * 判断是否有权限
     */
    hasPermission(permissionId: number): boolean | number {
        const index = this.role.permissionIds.indexOf(permissionId);
        return index >= 0 ? index : false;
    }

    /**
     * 添加/移除权限
     */
    changePermission(permissionId: number, isAdd: boolean) {
        const index = this.hasPermission(permissionId);
        if (isAdd && index === false) {
            this.role.permissionIds.push(permissionId);
        } else if ((!isAdd) && index !== false) {
            this.role.permissionIds.splice(<number>index, 1);
        }
    }
}
