import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-dropdown',
    template: `
        <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
            <ng-content></ng-content>
        </div>
        <div #menuView="tsView"
            (wheel)="itemWheel($event.deltaY)"
            [offsetX]="offsetX"
            [offsetY]="offsetY"
            [ngStyle]="{minWidth:minWidth+'px',zIndex:zIndex}"
            [position]="isApply(dropup)?'top':'bottom'"
            tsView="fadeIn"
            class="bg-white shadow no-select py-2">
            <a *ngFor="let item of itemList; trackBy: trackByValue"
               (click)="itemClick(item)"
               class="dropdown-item pointer bg-{{activeValue==item.value&&(color+' text-white')}}"
               hold close>{{item.text}}</a>
        </div>`
})
export class DropdownComponent extends BaseTheme {

    @Input() items: any[];

    @Input() dropup: string;

    @Input() offsetX: number;

    @Input() offsetY: number;

    @Input() useNumber: number;

    @Input() minWidth: number;

    @Input() zIndex: number;

    @Input() activeValue: number;

    @Output() menuClick = new EventEmitter<Item>();

    @Output() menuWheel = new EventEmitter<number>();

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

    constructor(csf: ConfigService) {
        super();
        this.color = csf.config.defaultColor;
        this.items = [];
        this.dropup = null;
        this.minWidth = 80;
        this.offsetX = 0;
        this.offsetY = 0;
        this.zIndex = 9999;
    }

    itemClick(item: Item) {
        this.menuClick.emit(item);
    }

    itemWheel(value: number) {
        this.menuWheel.emit(value);
        console.log(value);
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value !== null && value.toString() === '');
    }

    trackByValue(_: number, item: Item): number { return item.value; }
}
