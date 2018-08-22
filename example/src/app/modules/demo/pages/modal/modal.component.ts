/**
 * modal simple page
 *
 * @author xiaojian
 * @file   modal.component.ts
 * @date   2018-8-22 10:31:03
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../tools-ui';
import { ModalSimpleComponent } from './modal-simple.component';

@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    constructor(private modal: ModalService) { }

    showModal(size: string, center: boolean) {
        this.modal.create(ModalSimpleComponent, { size, center });
        this.modal.open();
    }
}
