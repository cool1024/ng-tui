import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';
import { Util } from '../../tui-core/util';
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
export class DropdownComponent extends BaseTheme implements OnChanges {

    @Input() items: Item[];

    @Input() dropup: string;

    @Input() offsetX: number;

    @Input() offsetY: number;

    @Input() minWidth: number;

    @Input() zIndex: number;

    @Input() activeValue: any;

    @Output() menuClick = new EventEmitter<Item>();

    @Output() menuWheel = new EventEmitter<number>();

    itemList: Item[] = [];

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
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items && changes.items.currentValue) {
            this.itemList = Util.formateItems(changes.items.currentValue)
        }
    }

    itemClick(item: Item) {
        this.activeValue = item.value;
        this.menuClick.emit(item);
    }

    itemWheel(value: number) {
        this.menuWheel.emit(value);
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value !== null && value.toString() === '');
    }

    trackByValue(_: number, item: Item): number { return item.value; }
}
