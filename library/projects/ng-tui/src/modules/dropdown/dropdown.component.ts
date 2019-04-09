import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';

@Component({
    selector: 'ts-dropdown',
    template: `
        <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
            <ng-content></ng-content>
        </div>
        <div #menuView="tsView"
            [offsetX]="offsetX"
            [offsetY]="offsetY"
            [ngStyle]="{minWidth:minWidth+'px'}"
            [position]="isApply(dropup)?'top':'bottom'"
            tsView="zoomIn"
            class="bg-white shadow-sm no-select py-2">
            <a *ngFor="let item of itemList; trackBy: trackByValue"
               (click)="itemClick(item)"
               class="dropdown-item pointer py-2"
               close>{{item.text}}</a>
        </div>`
})
export class DropdownComponent {

    @Input() items: any[];

    @Input() dropup: string;

    @Input() offsetX: number;

    @Input() offsetY: number;

    @Input() useNumber: number;

    @Input() minWidth: number;

    @Output() menuClick = new EventEmitter<Item>();

    get itemList(): Item[] {
        const items = new Array<any>();
        // just need some number value
        if (this.useNumber >= 0) {
            this.items.some((item, index) => {
                if (typeof item === 'string') {
                    items.push({ value: this.useNumber + index, text: item });

                } else if (typeof item === 'number') {
                    items.push({ value: this.useNumber + item, text: item.toString() });
                } else {
                    console.error('useNumber >= 0,items element must be a string or number', item);
                    return false;
                }
            });
        } else {
            // diy item value
            this.items.forEach(item => {
                items.push(typeof item === 'string' || typeof item === 'number' ? { value: item, text: item } : item);
            });
        }
        return items;
    }

    constructor() {
        this.items = [];
        this.dropup = null;
        this.minWidth = 100;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    itemClick(item: Item) {
        this.menuClick.emit(item);
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value !== null && value.toString() === '');
    }

    trackByValue(index: number, item: Item): number { return item.value; }
}
