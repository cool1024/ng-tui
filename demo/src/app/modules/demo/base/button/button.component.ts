import { Component, OnInit } from '@angular/core';
import { Loader } from 'ng-tui';
import { timer } from 'rxjs';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
})
export class ButtonComponent {
    constructor() {}

    doSubmit(btn: Loader): void {
        // close animation after 3s
        timer(3000).subscribe(() => {
            btn.complete();
        });
    }
}
