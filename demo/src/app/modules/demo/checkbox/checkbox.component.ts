import { Component } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {

    radioValue = 'primary';

    checkboxValue = ['primary'];

    switchValue = 'secondary';

    constructor() { }

}
