/**
 * 请编写模态框文件说明
 *
 * @author 填写作者
 * @file   write-test-modal.component.ts
 * @date   2018-12-14 14:49:08
 */
import { Component } from '@angular/core';
import { ModalService } from 'ng-tui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">新增持续写入测试</h5>
        <button (click)="modal.dismiss()" type="button" placeholder="请选择测试类型" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <ts-select [(ngModel)]="testType" [items]="testTypeOptions"></ts-select>
        <br>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text bg-white">单次数据量</span>
            </div>
            <input type="text" class="form-control">
            <div class="input-group-prepend input-group-append">
                <span class="input-group-text bg-white">测试次数</span>
            </div>
            <input type="text" class="form-control">
        </div>
        <br>
        <div>
            <ts-checkbox [value]="1" [(ngModel)]="selectTestItems">存储过程&nbsp;</ts-checkbox>
            <ts-checkbox [value]="2" [(ngModel)]="selectTestItems">PDO远程数据&nbsp;</ts-checkbox>
            <ts-checkbox [value]="3" [(ngModel)]="selectTestItems">存储过程-带索引&nbsp;</ts-checkbox>
            <ts-checkbox [value]="4" [(ngModel)]="selectTestItems">PDO远程数据-带索引&nbsp;</ts-checkbox>
        </div>
    </div>
    <div class="modal-footer">
        <button tsBtn (click)="modal.dismiss()">取消</button>
        <button tsBtn (click)="confirmAdd()" color="primary">确认测试</button>
    </div>`
})
export class WriteTestModalComponent {

    testTypeOptions = [
        { value: 1, text: '固定数据写入' },
        { value: 2, text: '递增数据写入' }
    ];

    testType = 1;

    selectTestItems = [];

    constructor(public modal: ModalService) { }

    confirmAdd() {
        this.modal.close({
            testType: this.testType,
            selectTestItems: this.selectTestItems
        });
    }
}
