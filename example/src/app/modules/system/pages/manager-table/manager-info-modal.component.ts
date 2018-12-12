/**
 * 帐户详情编辑/添加窗口
 *
 * @author cool1024
 * @file   manager-info-modal.component.ts
 * @date   2018-12-11 21:00:14
 */
import { Component } from '@angular/core';
import { ModalService, UploadConfig, ToastService } from 'ng-tui';
import { ManagerService } from '../../services/manager.service';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">
            {{userDetail.id>0?'编辑':'添加'}}帐户
        </h5>
        <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <form autocomplete="off" class="container m-0" style="max-width: 600px;">
            <div class="form-group">
                <label>头像</label>
                <div>
                    <ts-image-card [(src)]="userDetail.avatar" [config]="options" title=""></ts-image-card>
                </div>
            </div>
            <div class="form-group">
                <label>账号</label>
                <input name="account" required [(ngModel)]="userDetail.account" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" style="display: none;" />
                <!-- 编辑模式为选填 -->
                <input *ngIf="userDetail.id>0" name="ps" autocomplete="new-password" [(ngModel)]="userDetail.password"
                    type="password" class="form-control" placeholder="如果不修改密码，此处不填写">
                <!-- 添加模式为必填 -->
                <input *ngIf="userDetail.id==0" name="ps" autocomplete="new-password" [(ngModel)]="userDetail.password"
                    type="password" class="form-control" placeholder="请输入密码">
            </div>
            <div class="form-group">
                <label>角色</label>
                <ts-select name="role" required placeholder="请选择角色" [(ngModel)]="userDetail.roleId" [items]="roleOptions"></ts-select>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button tsBtn (click)="modal.dismiss()">取消</button>
        <button tsBtn loading (submit)="confirmSave($event)" color="primary">确认保存</button>
    </div>`
})
export class ManagerInfoModalComponent {

    userDetail: any = { id: 0 };

    options: UploadConfig;

    roleOptions = [];

    constructor(
        public modal: ModalService,
        private managerService: ManagerService,
        private toast: ToastService,
    ) {
        this.options = {
            queryString: '?x-oss-process=image/resize,h_130,w_130',
            uploader: (file: File) => this.managerService.uplodaAvatar(file),
        };
        this.managerService.getRoleOptions().subscribe(items => this.roleOptions = items);
    }

    confirmSave(btn: any) {
        (this.userDetail.id > 0
            ? this.managerService.updateManagerAccount(this.userDetail)
            : this.managerService.addManagerAccount(this.userDetail)
        ).subscribe({
            next: res => {
                this.toast.success('操作成功', `成功保存帐户${this.userDetail.account}~`);
                this.modal.close(res.datas);
            },
            complete: () => btn.complete()
        });
    }
}
