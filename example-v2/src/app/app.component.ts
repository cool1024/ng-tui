import { Component } from '@angular/core';
import { GlobalService, AuthService, MenuService, RequestService } from './cores/services';
import { AppConfig } from './configs/app.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    menuConfig = AppConfig.MENU_CONFIG;

    constructor(
        public global: GlobalService,
        public auth: AuthService,
        public menu: MenuService,
        private request: RequestService,
    ) {

        // 设置登入状态
        this.global.setValue('loginState', false);

        // 载入系统默认配置参数
        this.global.appendValuesToParams({
            dashboardMode: 'full',
            menuMode: this.global.getStringFromStorage('menuMode', 'full'),
            lazyload: true,
            color: AppConfig.THEM_COLOR
        });


        // 从本地文件载入菜单
        this.menu.loadLocalMenu();
    }

    /**
     * 切换菜单模式（small/full）
     */
    changeMenuMode() {
        this.global.params.menuMode = this.global.params.menuMode === 'small' ? 'full' : 'small';
        this.global.setValuesToStorage({ menuMode: this.global.params.menuMode });
        // 修复菜单变化图表等监听resize事件不生效问题
        setTimeout(() => {
            const event = document.createEvent('Event');
            event.initEvent('resize', true, true);
            window.dispatchEvent(event);
        }, 500);
    }
}
