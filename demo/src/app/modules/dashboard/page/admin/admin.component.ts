import { Component } from '@angular/core';
import { ItemTree } from 'ng-tui';

@Component({
    templateUrl: './admin.component.html',
})
export class AdminComponent {
    adminInfo = {
        name: 'Everett Lawson',
        role: 'Administrator',
        email: '123456@mail.com',
        phone: '(474)-465-8980',
        address: '6279 Lone Wolf Trail',
        description:
            'You can use AJAX to call the Random User Generator API and will receive a randomly generated user in return. If you are using jQuery, you can use the $.ajax() function in the code snippet below to get started.',
        city: 'kilcoole',
        state: 'active',
        zip: '...',
    };

    blockOptions: ItemTree[] = [];

    blockValue = ['11', '1101', '110101'];

    constructor() {
        // requestObject('https://www.cool1024.com/devexample/china').subscribe(options => this.blockOptions = options);
    }
}
