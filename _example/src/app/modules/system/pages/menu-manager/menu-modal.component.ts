import { Component } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { ModalService, ToastService, Item } from 'ng-tui';
import { MenuService } from '../../services/menu.service';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">菜单编辑面板</h5>
            <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label class="col-form-label">菜单标题:</label>
            <input [(ngModel)]="menu.menuTitle" type="text" class="form-control">
            <label *ngIf="menu.menuParentId===0" class="col-form-label">菜单图标:<i [ngClass]="menu.menuIcon"></i></label>
            <input *ngIf="menu.menuParentId===0"  [(ngModel)]="menu.menuIcon" type="text" class="form-control">
            <label *ngIf="menu.menuParentId===0" class="col-form-label">菜单图片:</label>
            <input *ngIf="menu.menuParentId===0"  [(ngModel)]="menu.menuImage" type="text" class="form-control">
            <label *ngIf="menu.menuParentId!==0" class="col-form-label">菜单链接:</label>
            <input *ngIf="menu.menuParentId!==0"  [(ngModel)]="menu.menuUrl" type="text" class="form-control">
            <label *ngIf="menu.menuParentId!==0" class="col-form-label">菜单权限:</label>
            <ts-select *ngIf="menu.menuParentId!==0"
             class="form-control p-0" [(ngModel)]="menu.permissionId" [items]="permissions"></ts-select>
        </div>
    </div>
    <div class="modal-footer">
        <button (click)="modal.dismiss()" type="button" class="btn btn-white">取消</button>
        <button tsBtn loading color="info" (submit)="confirmSave($event)" [disabled]="!menu.menuTitle">确认保存</button>
    </div>`,
})
export class MenuModalComponent {

    menu: Menu;

    permissions = new Array<Item>();

    constructor(
        public modal: ModalService,
        private toast: ToastService,
        private menuService: MenuService,
    ) {
        this.menuService.getPermissionOptions()
            .subscribe(res => {
                console.log(res.datas);
                this.permissions = res.datas.map(item => {
                    return { value: item.id, text: item.permissionName };
                });
                this.permissions.unshift({ value: 0, text: '无需权限' });
            });
    }

    /**
     * 确认保存
     * @param {any} btn
     */
    confirmSave(btn: any) {
        if (this.menu.id === 0) {
            this.menuService.insertMenu(this.menu)
                .subscribe({
                    next: () => {
                        this.toast.success('添加成功', `成功添加菜单${this.menu.menuTitle}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        } else {
            this.menuService.updateMenu(this.menu)
                .subscribe({
                    next: () => {
                        this.toast.success('修改成功', `成功修改菜单${this.menu.menuTitle}`);
                        this.modal.close();
                    },
                    complete: () => btn.dismiss()
                });
        }
    }
}
