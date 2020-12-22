import { Component } from '@angular/core';
import { ComponentHandleService, ConfirmService, ModalService, ToastService } from 'projects/ng-tui/src/public_api';

@Component({
    templateUrl: './modal.component.html'
})
export class ModalComponent {

    methods = [
        ['create(content: Component, data = {})', ' ModalHandle', `create new modal.`]
    ];

    modalTitle = 'Modal Title';

    constructor(private modal: ModalService, private toast: ToastService, private confirm: ConfirmService) { }

    showModal() {
        const param = { modalTitle: this.modalTitle };
        this.modal.create(SimpleModal)
            .present(param)
            .subscribe(res => {
                console.log(res);
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
                <h5 class="modal-title">{{modalTitle}}</h5>
                <button (click)="handle.close()" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Leave your message</label>
                    <textarea [(ngModel)]="message" class="form-control" rows="3"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button (click)="handle.close(message)" type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>`
})

export class SimpleModal {
    modalTitle: string;
    message: string;
    constructor(public handle: ComponentHandleService) { }
}