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
        hoverBackgroundColor: 'linear-gradient(135deg,rgb(143, 117, 218) 0,rgb(114, 124, 245) 60%)',
        // activeBackgroundColor: 'white',
        // activeBackgroundColor: '#343a40',
        activeBackgroundColor: 'linear-gradient(135deg,rgb(143, 117, 218) 0,rgb(114, 124, 245) 60%)'
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