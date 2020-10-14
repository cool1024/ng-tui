import { Component } from '@angular/core';
import { ComponentHandleService, ConfirmService, ModalService, ToastService } from 'projects/ng-tui/src/public_api';

@Component({
    templateUrl: './modal.component.html'
})
export class ModalComponent {

    constructor(private modal: ModalService, private toast: ToastService, private confirm: ConfirmService) { }

    showModal() {
        const param = { messageContent: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' };
        this.modal.create(SimpleModal)
            .present(param)
            .subscribe(res => {
                this.toast.info('Message', res);
            });
    }

    showDialog(color: string) {
        this.confirm.create('Dialog Title', '', { color }).subscribe(res => {
            this.toast.create('Message', `result : ${res}`, { color });
        });
    }
}

@Component({
    template: `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Simple Modal</h5>
                <button (click)="handle.close()" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input class="form-control"/>
            </div>
            <div class="modal-footer">
                <button (click)="handle.close(messageContent)" type="button" class="btn btn-secondary">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>`
}) class SimpleModal {
    messageContent: string;
    constructor(public handle: ComponentHandleService) { }
}