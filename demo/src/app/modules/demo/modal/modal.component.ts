import { Component } from '@angular/core';
import { ModalService } from 'projects/ng-tui/src/public_api';
import { ProgressComponent } from '../progress/progress.component';

@Component({
    templateUrl: './modal.component.html'

})
export class ModalComponent {

    constructor(private modal: ModalService) { }

    showModal() {
        this.modal.create(ProgressComponent).present();
    }
}