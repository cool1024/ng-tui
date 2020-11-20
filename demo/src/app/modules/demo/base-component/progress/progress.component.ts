import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.scss']
})
export class ProgressComponent {

    inputs = [
        ['color', 'string', `color name, such as 'success', 'primary', etc.`],
        ['value', 'number', '0-100']
    ];

    progressValue = 0;

    constructor() {
        interval(300).subscribe(value => this.progressValue = value % 101);
    }
}