import { Directive, Input, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { Item } from '../../tui-core/interface/item.interface';
import { MenuService } from './menu.service';

@Directive({
    selector: '[tsMenu]',
    exportAs: 'tsMenu',
})
export class MenuDirective implements OnDestroy {
    @Input() tsMenu!: string[];
    @Input() position: string;
    @Input() offsetX: number;
    @Input() offsetY: number;
    @Input() minWidth: number;
    @Input() animation: string;
    @Input() zIndex!: string;
    @Output() menuClick = new EventEmitter<Item>(false);

    @HostListener('click', ['$event']) onHostClick($event: any): void {
        const dom: HTMLElement = $event.target;
        if (!dom.hasAttribute('hover')) {
            this.showMenu(dom);
        }
    }

    @HostListener('mouseover', ['$event']) onHostHover($event: any): void {
        const dom: HTMLElement = $event.target;
        if (dom.hasAttribute('hover')) {
            this.showMenu(dom);
        }
    }

    constructor(private menuService: MenuService) {
        this.position = 'bottom';
        this.minWidth = this.offsetX = this.offsetY = 0;
        this.animation = 'fadeIn';
    }

    showMenu(dom: HTMLElement): void {
        this.menuService
            .showMenu(dom, this.tsMenu, {
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                minWidth: this.minWidth,
                position: this.position,
                animation: this.animation,
                zIndex: this.zIndex,
            })
            // tslint:disable-next-line: deprecation
            .subscribe((item) => this.menuClick.emit(item));
    }

    ngOnDestroy(): void {}
}
