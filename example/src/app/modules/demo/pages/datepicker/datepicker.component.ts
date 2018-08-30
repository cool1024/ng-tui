import { Component, OnInit } from '@angular/core';
import { RequestService, GlobalService } from '../../../../cores/services';

@Component({
    templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnInit {

    date = '';

    time = '';

    codes = ['', '', ''];

    constructor(
        public global: GlobalService,
        private request: RequestService
    ) { }

    ngOnInit() {
        this.request.withoutHost.text('assets/codes/datepicker-module.txt').subscribe(code => {
            this.codes[0] = code;
        });
        this.request.withoutHost.text('assets/codes/datepicker-html.txt').subscribe(code => {
            this.codes[1] = code;
        });
        this.request.withoutHost.text('assets/codes/datepicker-component.txt').subscribe(code => {
            this.codes[2] = code;
        });
    }
}
