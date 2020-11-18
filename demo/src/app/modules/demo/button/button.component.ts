import { Component, OnInit } from '@angular/core';
import { Loader } from 'projects/ng-tui/src/public_api';
import { timer } from 'rxjs';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    doSubmit(btn: Loader) {
        // close animation after 3s
        timer(3000).subscribe(() => {
            btn.complete();
        });
    }
}
