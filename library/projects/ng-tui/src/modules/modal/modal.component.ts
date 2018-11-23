import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'ts-modal',
    template: `
    <div #pad class="modal show fade animated slideInUp" (click)="tryClose($event)"
        [ngStyle]="{display: 'block',overflowY:'auto'}">
        <div class="modal-dialog modal-{{size}}"
            [ngStyle]="{height: scroll==='in'?'90%':'auto'}" [class.modal-dialog-centered]="center">
            <div class="modal-content h-100" [ngStyle]="scroll==='in'?{overflowY:'auto',overflowX:'hidden'}:{}">
                <ng-content></ng-content>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
    `,
    styles: [`:host ::ng-deep ng-component {
        height:100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }`]
})
export class ModalComponent {

    @ViewChild('pad') pad: any;

    size: string;

    center: boolean;

    scroll: string;

    closeHandle: () => void;

    constructor() {
        this.center = false;
        this.size = '';
    }

    tryClose(event: any) {
        if (event.target === this.pad.nativeElement) {
            this.closeHandle();
        }
    }
}
