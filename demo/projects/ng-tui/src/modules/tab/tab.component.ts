import { Component, Input, AfterViewChecked } from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';

@Component({
    selector: "ts-tabs",
    template: `
    <div class="tabs tabs-primary">
        <div class="tab" *ngFor="let tab of tabs;let i = index" [class.active]="activeIndex === i" (click)="setActive(i)">{{tab.text}}</div>
        <div class="tab-bar"></div>
    </div>`
})
export class TabComponent implements AfterViewChecked {


    @Input()
    items: any[] = [];

    activeIndex = -1;

    get tabs(): Item[] {
        return this.items.map(item => (typeof item === 'string' ? { text: item, value: item } : item));
    }

    setActive(index: number) {
        this.activeIndex = index

    }

    ngAfterViewChecked(): void {
        // throw new Error("Method not implemented.");
    }
}