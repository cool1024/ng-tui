import { Component, ViewChild } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';

@Component({
    selector: 'ts-modal',
    template: `
    <div>
        <div #pad class="modal show fade animated slideInUp">
            <ng-content></ng-content>
        </div>
        <div class="modal-backdrop fade show" (click)="tryClose($event)"></div>
    </div>
    `
})
export class ModalComponent implements TUIComponent {

    @ViewChild('pad') pad: any;

    handle: ComponentHandle;

    constructor(
    ) { }

    tryClose(event: any) {
        console.log(event.target);
        if (event.target === this.pad.nativeElement) {
            console.log(1111);
            this.handle.destroy();
        }
    }

    present() {

    }

    dismiss() {

    }

    destroy() {

    }
}
