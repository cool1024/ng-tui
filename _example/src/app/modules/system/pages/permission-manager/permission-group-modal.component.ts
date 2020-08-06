import { Component } from '@angular/core';
import { PermissionGroup } from '../../interfaces/permission.interface';
import { ModalService, ToastService } from 'ng-tui';
import { PermissionService } from '../../services/permission.service';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">权限分组编辑面板</h5>
            <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label class="col-form-label">权限组名:</label>
            <input [(ngModel)]="permissionGroup.permissionGroupName" type="text" class="form-control">
        </div>
    </div>
    <div class="modal-footer">
        <button (click)="modal.dismiss()" type="button" class="btn btn-white">取消</button>
        <button tsBtn loading color="primary" (submit)="confirmSave($event)" [disabled]="!permissionGroup.permissionGroupName">确认保存</button>
    </div>`,
})
export class PermissionGroupModalComponent {

    permissionGroup: PermissionGroup;

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
        if (this.permissionGroup.id === 0) {
            this.permissionService.insertPermissionGroup(this.permissionGroup)
                .subscribe({
                    next: () => {
                        this.toast.success('添加成功', `成功添加分组${this.permissionGroup.permissionGroupName}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        } else {
            this.permissionService.updatePermissionGroup(this.permissionGroup)
                .subscribe({
                    next: () => {
                        this.toast.success('修改成功', `成功修改分组${this.permissionGroup.permissionGroupName}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        }
    }
}
