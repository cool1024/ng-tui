import { Component } from '@angular/core';
import { MenuItem, requestObject, TUIService } from 'ng-tui';
import { loginConfig } from 'src/config/login-config';
import { DashbardService } from './modules/dashboard/service/dashboard.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    menu: MenuItem[] = [];

    constructor(public uiService: TUIService, public dashboardService: DashbardService) {
        // check login
        dashboardService.checkLoginStatus().subscribe((status) => {
            if (status === false) {
                dashboardService.showLogin(loginConfig);
            } else {
                requestObject('assets/menu.json').subscribe((obj) => (this.menu = obj));
            }
        });
    }

    navBack(): void {
        this.uiService.navBack();
    }
}
