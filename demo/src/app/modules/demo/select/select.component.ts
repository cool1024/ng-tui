import { Component } from '@angular/core';
import { Item, ItemTree, requestObject } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html'
})
export class SelectComponent {

    selectOptions: Item[] = [
        { text: 'Primary', value: 'primary' },
        { text: 'Secondary', value: 'secondary' },
        { text: 'Success', value: 'success' },
        { text: 'Warning', value: 'warning' },
        { text: 'Danger', value: 'danger' },
    ];

    blockOptions: ItemTree[] = [

    ];

    selectValue = 'primary';

    selectValues = ['primary'];

    blockValue = [];

    constructor() {
        requestObject('https://www.cool1024.com/devexample/china').subscribe(options => this.blockOptions = options);
    }

}
