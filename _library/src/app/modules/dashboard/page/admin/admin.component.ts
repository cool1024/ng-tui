import { Component } from '@angular/core';
import { requestObject, ItemTree } from 'projects/ng-tui/src/public_api';

@Component({
    templateUrl: './admin.component.html',
})
export class AdminComponent {

    blockOptions: ItemTree[] = [];

    blockValue = ["11", "1101", "110101"];

    constructor() {
        requestObject('https://www.cool1024.com/devexample/china').subscribe(options => this.blockOptions = options);
    }
}
