import { Component } from '@angular/core';
import { TUIService, MenuService, Position } from 'projects/ng-tui/src/public_api';
import { DashbardService } from '../../service/dashboard.service';
import { DropMenuItem } from 'projects/ng-tui/src/modules/dropdown/menu.component';
import { loginConfig } from 'src/config/login-config';

@Component({
    selector: 'dashboard-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    constructor(
        public uiService: TUIService,
        private menuService: MenuService,
        private dashboardService: DashbardService
    ) { }

    changeFullscreen() {
        this.uiService.toggleFullScreen();
    }

    showLanguageMenu(dom: HTMLElement) {
        this.menuService.showMenu(
            dom,
            ['简体中文', 'English'],
            { position: Position.AUTO, offsetY: 10 }
        ).subscribe();
    }

    showUserMenu(dom: HTMLElement) {
        const menuItems = [
            DropMenuItem.label('Adminstrater', 'iconfont icon-account'),
            DropMenuItem.label('1000-1000-1234', 'iconfont icon-mobile'),
            DropMenuItem.label('User Setting', 'iconfont icon-set'),
            DropMenuItem.split(),
            DropMenuItem.label('Sign Out', 'iconfont icon-out')
        ];
        const menuConfig = { position: Position.AUTO, offsetX: -100, offsetY: 10 };
        this.menuService.showMenu(dom, menuItems, menuConfig).subscribe(res => {
            if (res.index === 2) {
                this.uiService.navUrl('/admin');
            }
            if (res.index === 4) {
                this.dashboardService.cleanLoginStatus();
                this.dashboardService.showLogin(loginConfig);
            }
        });
    }
}
