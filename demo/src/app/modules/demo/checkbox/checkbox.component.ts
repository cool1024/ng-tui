import { Component } from '@angular/core';
import { ToastService } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {

    inputs = [
        ['color', ' string', `color name, such as 'success', 'primary', etc.`],
        ['value', ' any', 'checked value']
    ];

    outputs = [
        ['checkedChange', 'boolean', 'checked status.'],
    ];

    radioValues = ['success', 'primary', 'danger'];

    checkedValue = 'primary';

    constructor(private toast: ToastService) { }

    showToast(content: string): void {
        this.toast.notify({ title: 'Notify Title', content });
    }
}
