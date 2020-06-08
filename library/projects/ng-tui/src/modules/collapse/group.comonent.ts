import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem, MenuTheme, defaultMenuTheme } from './node.interface';

@Component({
    selector: '[tsGroup],ts-group',
    templateUrl: './group.html'
})
export class GroupComponent {

    @Input() node: MenuItem;

    @Input() level: number = 0;

    @Input() offset: number = 20;

    @Input() root: boolean = true;

    @Input() open: boolean = false;

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

    updateGroup() {
        this.setActive();
        this.cleanActive(this.node, this.node);
        this.itemClick.emit(this.node);
    }

    cleanActive(cleanItem: MenuItem, activeItem: MenuItem) {
        if (this.root) {
            (cleanItem !== activeItem) && (cleanItem.active = false);
            cleanItem.children && cleanItem.children.forEach(item => this.cleanActive(item, activeItem));
        }
    }

    setActive() {
        if ((!this.node.children) || this.node.children.length === 0) {
            this.node.active = true;
        }
    }
}