import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';

@Component({
    selector: 'ts-dropdown',
    template: `
    <div tsDropdown [dropup]="dropup">
        <button *ngIf="diyClass" [class]="diyClass" type="button" tsToggle>{{item ? item.text : text}}</button>
        <button *ngIf="!diyClass"
            tsToggle tsBtn
            class="dropdown-toggle"
            [lg]="isApply(lg)"
            [sm]="isApply(sm)"
            [outline]="isApply(outline)"
            [color]="color">{{item ? item.text : text}}</button>
        <div tsDropMenu>
            <button [class.active]="item.value === value"
                    class="dropdown-item pointer"
                    *ngFor="let item of itemList; trackBy: trackByValue"
                    (click)="itemClick(item)">
                {{item.text}}
            </button>
        </div>
    </div>`
})
export class DropdownComponent extends BaseTheme implements OnChanges {

    item: Item;

    @Input() text: string;

    @Input() color: string;

    @Input() value: any;

    @Input() items: any[];

    @Input() diyClass: string;

    @Input() dropup: string;

    @Input() useNumber: number;

    @Output() valueChange = new EventEmitter<any>();

    @Output() itemChange = new EventEmitter<Item>();

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
        super();
        this.items = [];
        this.diyClass = null;
        this.dropup = null;
        this.color = 'white';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.value) {
            const items = this.itemList;
            for (let i = 0; i < items.length; i++) {
                if (items[i].value === changes.value.currentValue) {
                    this.item = items[i];
                }
            }
        }
    }

    itemClick(item: Item) {
        this.item = item;
        this.valueChange.emit(item.value);
        this.itemChange.emit(item);
    }

    trackByValue(index: number, item: Item): number { return item.value; }
}
