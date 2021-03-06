import { Component } from '@angular/core';
import { TUIService, MenuService, Position, DropMenuItem } from 'projects/ng-tui/src/public_api';
import { DashbardService } from '../../service/dashboard.service';
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

    changeMenuMode() {
        this.dashboardService.menuMode = !this.dashboardService.menuMode;
    }

    changeFullscreen() {
        this.uiService.toggleFullScreen();
    }

    showLanguageMenu(dom: HTMLElement) {
        this.menuService.showMenu(
            dom,
            [
                DropMenuItem.image('简体中文', 'assets/images/flags/cn.gif', 1),
                DropMenuItem.image('日本语', 'assets/images/flags/jp.gif', 2),
                DropMenuItem.image('English', 'assets/images/flags/en.gif', 3)
            ],
            { position: Position.AUTO, offsetY: 10 }
        ).subscribe();
    }

    showUserMenu(dom: HTMLElement) {
        const menuItems = [
            DropMenuItem.label('系统管理员', 'iconfont icon-account'),
            DropMenuItem.label('18270881855', 'iconfont icon-mobile'),
            DropMenuItem.label('个人设置', 'iconfont icon-set'),
            DropMenuItem.split(),
            DropMenuItem.label('退出登录', 'iconfont icon-out')
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
