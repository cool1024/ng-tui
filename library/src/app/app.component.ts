import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    date = '2019/1/2';

    year = 1990;

    time = '15:31:46';

    constructor() { }

}
