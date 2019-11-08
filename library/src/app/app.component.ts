import { Component } from '@angular/core';
import { requestObject, MenuItem, TUIService } from 'projects/ng-tui/src/public_api';
import { Router } from '@angular/router';

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

    constructor(private router: Router, public uiService: TUIService) {
        requestObject('/assets/menu.json').subscribe(obj => {
            this.menu.children = obj;
            console.log(this.menu);
        });
    }

    navHandler(item: MenuItem) {
        if (item.route) {
            this.router.navigateByUrl(item.route);
        }
    }

    changeFullscreen() {
        this.uiService.toggleFullScreen();
    }
}