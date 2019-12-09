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

    loginForm = {
        account: '',
        password: ''
    };

    constructor(private router: Router) { }

    confirmLogin(btn: any) {

    }

    devPreview() {
        this.router.navigateByUrl('/home');
    }

    present() { }

    dismiss() { }

    destroy() { }
}
