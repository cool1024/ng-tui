import { Component } from '@angular/core';
import {
    requestObject,
    MenuItem,
    TUIService,
} from 'projects/ng-tui/src/public_api';
import { DashbardService } from './modules/dashboard/service/dashboard.service';
import { loginConfig } from './config/login-config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // 菜单树
    menu: MenuItem = {
        title: '',
        children: []
    };

    constructor(
        public uiService: TUIService,
        public dashboardService: DashbardService
    ) {
        // 校验登录
        dashboardService.checkLoginStatus().subscribe(status => {
            if (status === false) {
                // 显示登录页面
                dashboardService.showLogin(loginConfig);
            } else {
                // 载入菜单
                requestObject('assets/menu.json').subscribe(obj => this.menu.children = obj);
            }
        });
    }

    navBack() {
        this.uiService.routeLoading = true;
        // this.uiService.navBack();
    }
}