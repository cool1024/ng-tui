import { Component } from '@angular/core';
import { MenuGroup } from '../../interfaces/menu.interface';
import { ModalService, ToastService } from 'ng-tui';
import { MenuService } from '../../services/menu.service';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">菜单分组编辑面板</h5>
            <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label class="col-form-label">菜单组名:</label>
            <input [(ngModel)]="menuGroup.menuGroupName" type="text" class="form-control">
        </div>
    </div>
    <div class="modal-footer">
        <button (click)="modal.dismiss()" type="button" class="btn btn-white">取消</button>
        <button tsBtn loading color="info" (submit)="confirmSave($event)" [disabled]="!menuGroup.menuGroupName">确认保存</button>
    </div>`,
})
export class MenuGroupModalComponent {

    menuGroup: MenuGroup;

    constructor(
        public modal: ModalService,
        private toast: ToastService,
        private menuService: MenuService,
    ) { }

    /**
     * 确认保存
     *
     * @param {any} btn
     */
    confirmSave(btn: any) {
        if (this.menuGroup.id === 0) {
            this.menuService.insertMenuGroup(this.menuGroup)
                .subscribe({
                    next: () => {
                        this.toast.success('添加成功', `成功添加分组${this.menuGroup.menuGroupName}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        } else {
            this.menuService.updateMenuGroup(this.menuGroup)
                .subscribe({
                    next: () => {
                        this.toast.success('修改成功', `成功修改分组${this.menuGroup.menuGroupName}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        }
    }
}
