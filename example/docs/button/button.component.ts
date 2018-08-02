import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    doSubmit(btn: any) {
        timer(3000).subscribe(() => {
            btn.complete();
            // btn.dismiss();
        });
    }

}
