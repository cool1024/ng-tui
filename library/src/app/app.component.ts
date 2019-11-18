import { Component } from '@angular/core';
import { requestObject, MenuItem, TUIService, MenuService, Position } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // 菜单树
    menu: MenuItem = {
        title: '',
        children: []
    };

    constructor(public uiService: TUIService, private menuService: MenuService) {
        requestObject('/assets/menu.json').subscribe(obj => {
            this.menu.children = obj;
            console.log(this.menu);
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

    showUserMenu(dom: HTMLElement) {
        console.log(dom);
        this.menuService.showMenu(dom, ['1111', '', '2222'], { position: Position.AUTO, offsetX: 0 }).subscribe();
    }
}