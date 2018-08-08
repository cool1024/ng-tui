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

    @Output() menuActiveChange = new EventEmitter<MenuItem>();

    constructor() {
        this.items = new Array<MenuModel>();
        this.autoClose = true;
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
