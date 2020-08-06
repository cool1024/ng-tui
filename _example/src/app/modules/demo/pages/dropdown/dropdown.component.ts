import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

    dropdowns = [
        { text: 'Apple', value: 1 },
        { text: 'Board', value: 2 },
        { text: 'Card', value: 3 },
    ];

    dropdownValue = 1;

    stringDropdowns = ['Apple', 'Board', 'Card'];

    constructor() { }

    ngOnInit() {
    }

}
