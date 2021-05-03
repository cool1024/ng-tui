import { Component, ViewChild } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';

@Component({
    selector: 'ts-modal',
    template: `
    <div (click)="tryClose($event)">
        <div #pad class="modal show fade animated slideInUp"></div>
        <div class="modal-backdrop fade show"></div>
    </div>
    `
})
export class ModalComponent implements TUIComponent {

    @ViewChild('pad') pad: any;

    handle!: ComponentHandle;

    tryClose(event: any) {
        if (event.target === this.pad.nativeElement) {
            this.handle.destroy();
        }
    }

    present() { }
    dismiss() { }
    destroy() { }
}
