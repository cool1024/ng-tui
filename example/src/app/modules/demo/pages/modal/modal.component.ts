/**
 * modal simple page
 *
 * @author xiaojian
 * @file   modal.component.ts
 * @date   2018-8-22 10:31:03
 */
import { Component } from '@angular/core';
import { ModalService, WindowService } from 'ng-tui';
import { ModalSimpleComponent } from './modal-simple.component';
import { SimpleWindowComponent } from './simple-window.component';
import { ViewComponent } from '../upload/view.component';
import { OfficeViewComponent } from './office-view/office-view.component';

@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    constructor(private modal: ModalService, private window: WindowService) { }

    showModal(size: string, center: boolean) {
        this.modal.create(ModalSimpleComponent, { size, center });
        this.modal.open();
    }

    showWindow() {
        const window = this.window.push(SimpleWindowComponent);
        window.present();
    }

    showImage(src: string) {
        const window = this.window.push(ViewComponent);
        window.instance.src = src;
        window.present();
    }

    showOffice() {
        const window = this.window.push(OfficeViewComponent);
        window.present();
    }
}
