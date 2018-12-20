/**
 * 请求头编辑弹窗
 *
 * @author cool1024
 * @file   api-header.component.ts
 * @date   2018-12-20 17:46:01
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-tui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">
            api-header
        </h5>
        <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <textarea class="form-control" placeholder="一个JSON字符串，如{{exampleJson|json}}"></textarea>
    </div>
    <div class="modal-footer">
        <button tsBtn (click)="modal.dismiss()">取消</button>
        <button tsBtn color="primary">确认保存</button>
    </div>`
})
export class ApiHeaderComponent implements OnInit {

    exampleJson = {
        'ng-params-one': 35,
        'ng-params-two': 'YTRiZTAwMzg2MDEwYjA2NzYwY2U3YmQxNGQxNThjNzRhNGNmZjA4MWYwMzM5NzNkYWVlYzc5MTBiZDVjMzcyMGFmZmRjM2Vi',
        'ng-params-three': 'managerapi'
    };

    constructor(public modal: ModalService) { }

    ngOnInit() {

    }
}
