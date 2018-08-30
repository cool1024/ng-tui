import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuModel, MenuGroup, MenuItem } from './menu.interface';


@Component({
    selector: `app-menu`,
    exportAs: 'appMenu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    @Input() items: MenuModel[];

    @Input() autoClose: boolean;

    @Input() menuMode: string;

    @Input() menuConfig: any;

    @Output() menuActiveChange = new EventEmitter<MenuItem>();

    get menuChildActiveClass(): string {
        return `text-${this.menuConfig.ACTIVE_TEXT_THEME} active`;
    }

    get menuFillStyle(): Object {
        return {
            background: this.menuConfig.BACKGROUND_COLOR,
        };
    }

    get menuFullStyle(): Object {
        return {
            backgroundImage: this.menuConfig.BACKGROUND_IMAGE_SRC,
            color: this.menuConfig.DEFAULT_TEXT_COLOR
        };
    }

    get lineStyle(): Object {
        return {
            background: this.menuConfig.LINE_COLOR
        };
    }

    constructor() {
        this.items = new Array<MenuModel>();
        this.autoClose = true;
        this.menuMode = 'full';
        this.menuConfig = {};
    }

    toggleGroup(group: MenuGroup) {
        const tempActive = group.active;
        this.setAllInActive();
        group.active = !tempActive;
    }

    toggleMenu(group: MenuGroup, itemIndex: number) {
        this.setAllInActive();
        group.active = true;
        group.menuItems[itemIndex].active = true;
        this.menuActiveChange.emit(group.menuItems[itemIndex]);
    }

    setActive(menu: MenuItem) {
        this.setAllInActive();
        for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items[i].menuGroups.length; j++) {
                for (let k = 0; k < this.items[i].menuGroups[j].menuItems.length; k++) {
                    const temp = this.items[i].menuGroups[j].menuItems[k];
                    if (temp.title === menu.title && temp.url === menu.url) {
                        temp.active = true;
                        temp.targetGroup.active = true;
                    }
                }
            }
        }
    }

    setAllInActive() {
        this.items.forEach(item => {
            item.menuGroups.forEach(a => {
                if (this.autoClose) { a.active = false; }
                a.menuItems.forEach(b => {
                    b.active = false;
                });
            });
        });
    }
}
