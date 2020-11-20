import { Component, Input } from '@angular/core';
import { MenuItem, createMenuTheme, TUIService } from 'projects/ng-tui/src/public_api';
import { DashbardService } from '../../service/dashboard.service';

@Component({
    selector: 'dashboard-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {

    // 菜单树
    @Input() menu: MenuItem[] = [];

    // 菜单主题
    menuTheme = createMenuTheme({
        defaultTextColor: '#343a40',
        hoverTextColor: 'white',
        activeTextColor: 'rgb(20, 140, 255)',
        hoverBackgroundColor: 'linear-gradient(135deg, rgb(0 123 255 / 0.2) 0px, rgb(20 140 255 / 0.3) 60%)',
        activeBackgroundColor: 'rgba(20, 140, 255, 0.3)',
        // activeBackgroundColor: '#343a40',
        // activeBackgroundColor: 'linear-gradient(135deg, rgb(0 123 255) 0px, rgb(20 140 255) 60%)'
    });

    get min(): boolean {
        return this.dashboardService.menuMode;
    }

    get width(): number {
        return this.dashboardService.menuMode ? 100 : 270;
    }

    constructor(
        private uiService: TUIService,
        private dashboardService: DashbardService
    ) { }

    navHandler(item: MenuItem) {
        if (item.route) {
            this.uiService.navUrl(item.route);
        }
    }
}