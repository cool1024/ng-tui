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

    constructor(public uiService: TUIService, private menuService: MenuService) {
        requestObject('/assets/menu.json').subscribe(obj => this.menu.children = obj);
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
            { position: Position.BOTTOM, offsetY: 10 }
        ).subscribe();
    }

    showUserMenu(dom: HTMLElement) {
        this.menuService.showMenu(
            dom,
            [
                { title: '系统管理员', icon: 'iconfont icon-account' },
                { title: '18270881855', icon: 'iconfont icon-mobile' },
                '',
                { title: '个人设置', icon: 'iconfont icon-set' },
                { title: '退出登录', icon: 'iconfont icon-out' }
            ],
            { position: Position.AUTO, offsetX: -105, offsetY: 10 }
        ).subscribe();
    }
}