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

    constructor(public dashboardService: DashbardService, public uiService: TUIService) {
        // check login
        dashboardService.checkLoginStatus().subscribe((status) => {
            if (status === false) {
                dashboardService.showLogin(loginConfig);
            } else {
                requestObject('assets/menu.json').subscribe((obj) => {
                    this.applyActiveMenu(obj);
                    this.menu = obj;
                });
            }
        });
    }

    applyActiveMenu(tempMenus: MenuItem[]): void {
        const currentUrl = window.location.pathname;
        const menus = this.menuArray({ children: tempMenus });
        menus.forEach((path) => {
            const menu = path.shift();
            if (menu?.route === currentUrl) {
                console.log(currentUrl);
                menu.active = true;
                path.forEach((menu) => (menu.active = true));
            }
        });
        console.log(menus);
        console.log(currentUrl);
    }

    menuArray(node: MenuItem, path: MenuItem[] = [], paths: MenuItem[][] = []) {
        path = [...path];
        path.push(node);
        if (node.children) {
            node.children.forEach((child) => {
                this.menuArray(child, path, paths);
            });
        } else {
            paths.push(path);
        }
        return paths;
    }
}
