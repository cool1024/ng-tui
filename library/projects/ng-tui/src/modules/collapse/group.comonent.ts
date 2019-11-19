import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem, MenuTheme, defaultMenuTheme } from './node.interface';

@Component({
    selector: 'ts-group',
    templateUrl: './group.html',
    styles: [`
    .ts-menu-hover{cursor:pointer;}
    .ts-menu-hover:hover{background-color: rgba(0, 0, 0, 0.04);}
    .ts-menu-hover:active{background-color: rgba(0, 0, 0, 0.1);}
    .ts-icon-up{transform: rotate(180deg);transition: all .5s linear;}
    .ts-icon-down{transform: rotate(0deg);transition: all .5s linear;}
    `]
})
export class GroupComponent {

    @Input() node: MenuItem;

    @Input() width: number;

    @Input() level: number = 0;

    @Input() offset: number = 20;

    @Input() root: boolean = true;

    @Input() open: boolean = false;

    @Input() theme: MenuTheme = defaultMenuTheme;
    ;

    @Output() itemClick = new EventEmitter<MenuItem>();

    get activeBarStyle() {
        return {
            top: 0,
            left: (this.level * - this.offset) + 'px',
            width: this.width + 'px'
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