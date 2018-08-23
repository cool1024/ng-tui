/**
 * 图片预览
 *
 * @author xiaojian
 * @file   view.component.ts
 * @date   2018-6-27 20:45:03
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from './../../../../tools-ui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">
            图片预览
        </h5>
        <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body d-flex justify-content-center" [ngStyle]="{height:'calc(100% - 135px)'}">
        <img class="mw-100 mh-100 align-self-center" [src]="src">
    </div>
    <div class="modal-footer">
        <button tsBtn (click)="modal.dismiss()">关闭窗口</button>
    </div>`
})
export class ViewComponent implements OnInit {

    src: string;

    constructor(public modal: ModalService) { }

    ngOnInit() {

    }
}
