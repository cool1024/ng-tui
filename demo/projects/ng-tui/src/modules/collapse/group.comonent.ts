import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem, MenuTheme, defaultMenuTheme } from './node.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: '[tsGroup],ts-group',
    templateUrl: './group.html'
})
export class GroupComponent {

    @Input() nodes: MenuItem[];

    @Input() level: number = 0;

    @Input() offset: number = 20;

    @Input() root: boolean = true;

    @Input() open: boolean = false;

    @Input() min: boolean = false;

    @Input() theme: MenuTheme = defaultMenuTheme;

    @Output() itemClick = new EventEmitter<MenuItem>();

    get marginLeft() {
        return (this.level + 1) * this.offset;
    }

    get hoverStyle() {
        return {
            color: [this.theme.defaultTextColor, this.theme.hoverTextColor, this.theme.activeTextColor],
            background: [this.theme.defaultBackgroundColor, this.theme.hoverBackgroundColor, this.theme.activeBackgroundColor]
        };
    }

    constructor(public sanitizer: DomSanitizer) { }

    updateGroup(node: MenuItem) {
        this.setActive(node);
        this.cleanActive(this.nodes, node);
        this.itemClick.emit(node);
    }

    cleanActive(cleanItems: MenuItem[], activeItem: MenuItem) {
        if (this.root && activeItem.hasOwnProperty('route')) {
            cleanItems.forEach(item => {
                (item !== activeItem) && (item.active = false);
                item.children && this.cleanActive(item.children, activeItem);
            });
        }
    }

    setActive(node: MenuItem) {
        if (!Array.isArray(node.children)) {
            node.children = [];
        }
        if (node.children.length === 0) {
            node.active = true;
        }
    }
}