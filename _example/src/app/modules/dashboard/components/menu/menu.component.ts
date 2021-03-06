import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    ViewChildren,
    QueryList,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { MenuModel, MenuGroup, MenuItem } from './menu.interface';
import { SideMenuGroupDirective } from 'ng-tui';
import { GlobalService } from 'src/app/cores/services';
import { Route, Router } from '@angular/router';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';

@Component({
    selector: `app-menu`,
    exportAs: 'appMenu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnChanges {

    @Input() items: MenuModel[];

    @Input() autoClose: boolean;

    @Input() menuMode: string;

    @Input() useImage: boolean;

    @Input() menuConfig: any;

    @ViewChildren(SideMenuGroupDirective) menuGroups: QueryList<SideMenuGroupDirective>;

    @ViewChild('menu') set menuDom(elementRef: ElementRef) {
        const OverlayScrollbars = this.global.getWindowObject('OverlayScrollbars');
        OverlayScrollbars(elementRef.nativeElement, { className: 'os-theme-dark' });
    }

    @Output() menuActiveChange = new EventEmitter<MenuItem>();

    get activeMainClass(): string {
        return `border-${this.menuConfig.ACTIVE_TEXT_THEME} bg-${this.menuConfig.ACTIVE_TEXT_THEME}-muted`;
    }

    get menuChildActiveClass(): string {
        return `bg-${this.menuConfig.ACTIVE_TEXT_THEME}-muted text-${this.menuConfig.ACTIVE_TEXT_THEME} active`;
    }

    get menuChildClass(): string {
        return `bg-${this.menuConfig.ACTIVE_TEXT_THEME}-hover`;
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

    get modelMenuStyle(): Object {
        return {
            color: this.menuConfig.MODEL_TITLE_COLOR
        };
    }

    get menuSmallStyle(): Object {
        return {
            background: this.menuConfig.BACKGROUND_COLOR,
            color: this.menuConfig.DEFAULT_TEXT_COLOR
        };
    }

    get lineStyle(): Object {
        return {
            background: this.menuConfig.LINE_COLOR
        };
    }

    constructor(
        private global: GlobalService,
        private router: Router
    ) {
        this.items = new Array<MenuModel>();
        this.autoClose = true;
        this.menuMode = 'full';
        this.menuConfig = {};
        this.useImage = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.findActiveGroup();
    }


    findActiveGroup() {
        const activePath = window.location.pathname;
        // for (let i = 0; i < this.items.length; i++) {
        //     const item = this.items[i];
        //     for (let j = 0; j < item.menuGroups.length; j++) {
        //         const child = item.menuGroups[j];
        //         child.menuItems.some(it)
        //     }
        // }
    }

    toggleGroup(group: MenuGroup) {
        const tempActive = group.active;
        this.setAllGroupInActive();
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

    setAllGroupInActive() {
        this.items.forEach(item => {
            item.menuGroups.forEach(a => {
                if (this.autoClose) { a.active = false; }
            });
        });
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

    closeOtherMenu(offset: number, index: number) {
        for (let i = 0; i < offset; i++) {
            index += this.items[i].menuGroups.length;
        }
        const menuGroups = this.menuGroups.toArray();
        menuGroups.splice(index, 1);
        menuGroups.forEach(item => item.dismiss());
    }
}
