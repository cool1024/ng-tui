import { Component } from '@angular/core';
import { Permission } from '../../interfaces/permission.interface';
import { ModalService, ToastService } from 'ng-tui';
import { PermissionService } from '../../services/permission.service';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">权限编辑面板</h5>
            <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label class="col-form-label">权限名:</label>
            <input [(ngModel)]="permission.permissionName" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label class="col-form-label">关键词:</label>
            <input [(ngModel)]="permission.permissionKey" type="text" class="form-control">
        </div>
    </div>
    <div class="modal-footer">
        <button (click)="modal.dismiss()" type="button" class="btn btn-white">取消</button>
        <button tsBtn loading color="primary" (submit)="confirmSave($event)" [disabled]="!permission.permissionKey">确认保存</button>
    </div>`,
})
export class PermissionModalComponent {

    permission: Permission;

    constructor(
        public modal: ModalService,
        private toast: ToastService,
        private permissionService: PermissionService,
    ) { }

    /**
     * 确认保存
     *
     * @param {any} btn
     */
    confirmSave(btn: any) {
        if (this.permission.id === 0) {
            this.permissionService.insertPermission(this.permission)
                .subscribe({
                    next: () => {
                        this.toast.success('添加成功', `成功添加权限${this.permission.permissionName}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        } else {
            this.permissionService.updatePermission(this.permission)
                .subscribe({
                    next: () => {
                        this.toast.success('修改成功', `成功修改权限${this.permission.permissionName}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        }
    }
}
