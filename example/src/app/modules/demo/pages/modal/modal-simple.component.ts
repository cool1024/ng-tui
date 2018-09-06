/**
 * simple modal component
 *
 * @author xiaojian
 * @file   modal-simple.component.ts
 * @date   2018-8-22 10:32:23
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-tui';

@Component({
    template: `
    <div class="modal-header">
        <h5 class="modal-title">
            modal-simple
        </h5>
        <button (click)="modal.dismiss()" type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">

    </div>
    <div class="modal-footer">
        <button tsBtn (click)="modal.dismiss()">取消</button>
        <button tsBtn color="primary">确认保存</button>
    </div>`
})
export class ModalSimpleComponent implements OnInit {

    constructor(public modal: ModalService) { }

    ngOnInit() {

    }
}
