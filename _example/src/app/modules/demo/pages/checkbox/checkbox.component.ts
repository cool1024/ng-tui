import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    radioValue = 1;

    switchValue = true;

    checkboxValues = [1, 2];

    constructor() { }

    ngOnInit() {
    }

}
