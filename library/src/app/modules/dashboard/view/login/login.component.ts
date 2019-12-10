import { Component, Input } from '@angular/core';
import { LoginConfig } from './login.interface';
import { Router } from '@angular/router';
import { TUIComponent } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'dashboard-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements TUIComponent {

    @Input() config: LoginConfig;

    display = false;

    loginForm = {
        account: '',
        password: ''
    };

    constructor(private router: Router) { }

    confirmLogin(btn: any) {
        this.dismiss();
    }

    devPreview() {
        this.router.navigateByUrl('/home');
        this.dismiss();
    }

    present() { this.display = true; }

    dismiss() { this.display = false; }

    destroy() { }
}
