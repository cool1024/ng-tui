import { Component } from '@angular/core';
import { GlobalService, RequestService, MenuService } from './core/services';
import { MenuModel } from './modules/dashboard/components/menu/menu.interface';
import { AppConfig } from './configs/app.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // 系统菜单列表
    menus = new Array<MenuModel>();

    // 菜单配置参数
    menuConfig = AppConfig.MENU_CONFIG;

    constructor(
        public global: GlobalService,
        private request: RequestService,
        private menu: MenuService,
    ) {

        // 载入系统默认配置参数
        this.global.appendValuesToParams({
            dashboardMode: 'full',
            menuMode: 'small',
        });

        // 载入服务端参数

        // 1.菜单载入
        this.request.text('assets/json/menu.json').subscribe(res => {
            this.menus = this.menu.loadMenu(JSON.parse(res));
            console.log(this.menus);
        });
    }

    /**
     * 切换菜单模式（small/full）
     */
    changeMenuMode() {
        this.global.params.menuMode = this.global.params.menuMode === 'small' ? 'full' : 'small';
    }
}
