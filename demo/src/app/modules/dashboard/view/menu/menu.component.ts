import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem, createMenuTheme, TUIService } from 'ng-tui';
import { utils } from 'protractor';
import { DashbardService } from '../../service/dashboard.service';

@Component({
    selector: 'dashboard-menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnChanges {
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

    constructor(private uiService: TUIService, private dashboardService: DashbardService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const value = changes.menu ? changes.menu.currentValue : [];
        this.findActive(value);
    }

    findActive(items: MenuItem[]) {
        const currentPath = window.location.pathname;
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
            const path = items[i].route || 'EMPTY';
            if (currentPath.indexOf(path) >= 0) {
                items[i].active = true;
                console.log("ACTIVE");
                return;
            }
            const children = items[i].children || [];
            if (children.length > 0) {
                console.log(children);
                this.findActive(children);
            }
        }
    }

    navHandler(item: MenuItem): void {
        if (item.route) {
            this.uiService.navUrl(item.route);
        }
    }
}
