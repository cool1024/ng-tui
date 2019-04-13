import { Component } from '@angular/core';
import { DateRange } from '../../projects/ng-tui/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    date = '2019/1/2';

    year = 1990;

    time = '15:31:46';

    range: DateRange = {
        start: '2019/01/02',
        end: '2019/01/09',
    }

    constructor() { }

}
