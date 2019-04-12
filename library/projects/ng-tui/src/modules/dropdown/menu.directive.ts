import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';
import { MenuService } from './menu.service';

@Directive({
    selector: '[tsMenu]',
    exportAs: 'tsMenu'
})
export class MenuDirective {

    @Input() tsMenu: string[];
    @Output() menuClick = new EventEmitter<Item>(false);
    @Input() position: string;
    @Input() offsetX: number;
    @Input() offsetY: number;
    @Input() minWidth: number;
    @Input() animation: string;

    @HostListener('click', ['$event']) onHostClick($event: any) {
        const dom: HTMLElement = $event.target;
        if (!dom.hasAttribute('hover')) {
            this.showMenu(dom);
        }
    }

    @HostListener('mouseover', ['$event']) onHostHover($event: any) {
        const dom: HTMLElement = $event.target;
        if (dom.hasAttribute('hover')) {
            this.showMenu(dom);
        }
    }

    constructor(private menuService: MenuService) {
        this.position = 'bottom';
        this.minWidth = this.offsetX = this.offsetY = 0;
        this.animation = 'zoomIn';
    }

    showMenu(dom: HTMLElement) {
        this.menuService.showMenu(dom, this.tsMenu, {
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            minWidth: this.minWidth,
            position: this.position,
            animation: this.animation,
        }).subscribe((item) => this.menuClick.emit(item));
    }
}
