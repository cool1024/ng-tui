/**
 * 请求头编辑弹窗
 *
 * @author cool1024
 * @file   api-header.component.ts
 * @date   2018-12-20 17:46:01
 */
import { Component, OnInit } from '@angular/core';
import { ModalService, ToastService } from 'ng-tui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">接口请求头设置</h5>
        <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <textarea class="form-control" [(ngModel)]="requestHeaders" placeholder="一个JSON字符串" style="height:100px"></textarea>
    </div>
    <div class="modal-footer">
        <button tsBtn (click)="modal.dismiss()">取消</button>
        <button tsBtn (click)="confirmSetting()" color="info">确认设置</button>
    </div>`
})
export class ApiHeaderComponent {

    requestHeaders = JSON.stringify({
        'ng-params-one': 35,
        'ng-params-two': '令牌',
        'ng-params-three': 'managerapi'
    });

    constructor(
        public modal: ModalService,
        private toast: ToastService
    ) { }

    confirmSetting() {
        try {
            this.modal.close(JSON.parse(this.requestHeaders) || {});
        } catch (e) {
            console.error(e);
            this.toast.warning('数据格式错误', '请求头设置参数必须是合法的JSON字符串');
        }

    }

}
