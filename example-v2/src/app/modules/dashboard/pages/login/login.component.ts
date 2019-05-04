import { Component } from '@angular/core';
import { AppConfig } from '../../../../configs/app.config';
import { Router } from '@angular/router';
import { GlobalService, RequestService, MenuService, AuthService } from '../../../../cores/services';
import { HttpConfig } from '../../../../configs/http.config';
import { Account } from './account.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    config = AppConfig.LOGIN_PAGE;

    account: Account = {
        account: '',
        password: '',
        platform: HttpConfig.PLATFORM_NAMWE,
    };

    constructor(
        private router: Router,
        public global: GlobalService,
        private request: RequestService,
        private menu: MenuService,
        private auth: AuthService,
    ) { }

    confirmLogin(btn: any) {
        this.request.withoutHeader.post('/managerapi/signin', this.account).subscribe({
            next: res => {
                const datas = res.datas;
                this.global.setValuesToStorage({
                    'ng-params-one': datas.id,
                    'ng-params-two': datas.token,
                    'ng-params-three': datas.platform,
                });
                this.auth.loadUserDeail();
                this.menu.loadMenu().subscribe();
                // this.menu.loadMenu();
                this.router.navigateByUrl('/');
            },
            complete: btn.dismiss()
        });
    }
}
