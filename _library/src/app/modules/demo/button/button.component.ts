import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
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
