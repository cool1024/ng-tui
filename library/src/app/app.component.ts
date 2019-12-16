import { Component } from '@angular/core';
import {
    createMenuTheme,
    requestObject,
    MenuItem,
    Position,
    MenuTheme,
    TUIService,
    MenuService,
} from 'projects/ng-tui/src/public_api';
import { LoginConfig } from './modules/dashboard/view/login/login.interface';
import { DashbardService } from './modules/dashboard/service/dashboard.service';
import { DropMenuItem } from 'projects/ng-tui/src/modules/dropdown/menu.component';

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

    // 菜单主题
    menuTheme: MenuTheme = createMenuTheme({
        activeTextColor: '#50a4ff'
    });

    // 登录页面配置
    loginConfig: LoginConfig = {
        backgroundImageSrc: '/assets/images/background.svg',
        logoSrc: '/assets/images/logo.svg',
        title: 'Admin Pro',
        subject: '管理员登录',
        description: '欢迎使用本模板，使用Angular打造的精简模板',
        firstLabel: '账户',
        firstPlaceholder: '请输入管理员账户',
        secondLabel: '密码',
        secondPlaceholder: '请输入管理员密码'
    };

    constructor(
        public uiService: TUIService,
        private menuService: MenuService,
        private dashboardService: DashbardService
    ) {
        // 校验登录
        dashboardService.checkLoginStatus().subscribe(status => {
            if (status === false) {
                // 显示登录页面
                dashboardService.showLogin();
            } else {
                // 载入菜单
                requestObject('/assets/menu.json').subscribe(obj => this.menu.children = obj);
            }
        });
    }

    navHandler(item: MenuItem) {
        if (item.route) {
            this.uiService.navUrl(item.route);
        }
    }

    navBack() {
        this.uiService.navBack();
    }

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
            DropMenuItem.label('系统管理员', 'iconfont icon-account'),
            DropMenuItem.label('18270881855', 'iconfont icon-mobile'),
            DropMenuItem.label('个人设置', 'iconfont icon-set'),
            DropMenuItem.split(),
            DropMenuItem.label('退出登录', 'iconfont icon-out')
        ];
        const menuConfig = { position: Position.AUTO, offsetX: -105, offsetY: 10 };
        this.menuService.showMenu(dom, menuItems, menuConfig).subscribe(res => {
            if(res.index === 4){
                this.dashboardService.cleanLoginStatus();
            }
        });
    }
}