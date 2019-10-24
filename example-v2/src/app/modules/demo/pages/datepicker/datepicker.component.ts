import { Component, OnInit } from '@angular/core';
import { RequestService, GlobalService } from '../../../../cores/services';
import { DateRange } from 'ng-tui';

@Component({
    templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnInit {

    year = 2019;

    date = '';

    time = '';

    range: DateRange = {
        start: '2019/01/02',
        end: '2019/01/09',
    };

    codes = ['', '', ''];

    constructor(
        public global: GlobalService,
        private request: RequestService
    ) { }

    ngOnInit() {
        // this.request.withoutHost.text('assets/codes/datepicker-module.txt').subscribe(code => {
        //     this.codes[0] = code;
        // });
        // this.request.withoutHost.text('assets/codes/datepicker-html.txt').subscribe(code => {
        //     this.codes[1] = code;
        // });
        // this.request.withoutHost.text('assets/codes/datepicker-component.txt').subscribe(code => {
        //     this.codes[2] = code;
        // });
    }
}
