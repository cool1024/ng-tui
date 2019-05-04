import { Component } from '@angular/core';
import { ComponentHandleService } from '../../../projects/ng-tui/src/public_api';

@Component({
    templateUrl: 'example-modal.component.html'
})
export class ExampleModalComponent {

    title: string;

    constructor(public cmptCtrl: ComponentHandleService) { }
}
