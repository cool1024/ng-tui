import { Component, Input } from '@angular/core';
import { MenuItem, createMenuTheme, TUIService } from 'projects/ng-tui/src/public_api';

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
        activeTextColor: 'white',
        hoverBackgroundColor: 'linear-gradient(135deg, rgb(0 123 255 / 0.2) 0px, rgb(20 140 255 / 0.3) 60%)',
        // activeBackgroundColor: 'white',
        // activeBackgroundColor: '#343a40',
        activeBackgroundColor: 'linear-gradient(135deg, rgb(0 123 255) 0px, rgb(20 140 255) 60%)'
    });

    constructor(
        private uiService: TUIService,
    ) { }

    navHandler(item: MenuItem) {
        if (item.route) {
            this.uiService.navUrl(item.route);
        }
    }
}