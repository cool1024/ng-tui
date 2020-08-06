/**
 * API测试添加/编辑窗口
 *
 * @author cool1024
 * @file   api-add.component.ts
 * @date   2018-12-20 21:30:39
 */
import { Component } from '@angular/core';
import { ModalService } from 'ng-tui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">{{modalTitle}}</h5>
        <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label>接口地址</label>
            <input [(ngModel)]="apiTest.url" class="form-control">
        </div>
        <div class="form-group">
            <label>请求方式</label>
            <select [(ngModel)]="apiTest.method" class="custom-select">
                <option ngValue="GET">GET</option>
                <option ngValue="POST">POST</option>
                <option ngValue="PUT">PUT</option>
                <option ngValue="DELETE">DELETE</option>
            </select>
        </div>
        <div class="form-group">
            <label>请求参数</label>
            <textarea [(ngModel)]="apiTest.params" class="form-control" style="height:100px"></textarea>
        </div>
    </div>
    <div class="modal-footer">
        <div class="flex-grow-1">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-white">测试次数</span>
                </div>
                <input [(ngModel)]="apiTest.testNum" type="number" class="form-control" placeholder="不填默认为10">
            </div>
        </div>
        <button tsBtn (click)="modal.dismiss()">取消</button>
        <button tsBtn (click)="confirmSave()" color="info">确认保存</button>
    </div>`
})
export class ApiAddComponent {

    modalTitle = '';

    apiTest = {
        url: '',
        method: 'GET',
        params: '',
        testNum: 10
    };

    constructor(public modal: ModalService) { }

    confirmSave() {
        this.modal.close(this.apiTest);
    }
}
