import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TabItem } from '../../tui-core/interfaces/item.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: "ts-tabs",
    exportAs: "tsTabs",
    template: `
    <div class="tabs tabs-{{color}}" #tabDom>
        <div class="tab" *ngFor="let item of items;let i = index" [class.active]="activeIndex === i" (click)="setActive(i)">
            <i *ngIf="item.icon" class="mr-1 {{item.icon}}"></i>
            {{itemText(item)}}
        </div>
        <div class="tab-bar" [style.left.px]="barOffset" [style.width.px]="barWidth"></div>
    </div><ng-content></ng-content>`
})
export class TabComponent extends BaseTheme implements AfterViewInit {

    @Input()
    items: Array<TabItem | string> = [];

    @Output()
    tabChange = new EventEmitter<number>(true)

    @ViewChild('tabDom')
    tabsRef: ElementRef;


    tabsDom: HTMLDivElement;
    activeIndex = 0;
    barOffset = 0;
    barWidth = 0;

    constructor(private configService: ConfigService) {
        super();
        this.color = this.configService.config.defaultColor;
    }

    itemText(item: TabItem | string) {
        return typeof item === 'string' ? item : item.text;
    }

    isActive(index: number) {
        return index === this.activeIndex
    }

    setActive(index: number) {
        this.activeIndex = index;
        this.tabChange.emit(index);
        this.moveBar();
    }

    moveBar() {
        if (this.tabsDom) {
            const tabItems = this.tabsDom.querySelectorAll('.tab')
            if (tabItems) {
                this.barOffset = 0
                tabItems.forEach((tab, i) => {
                    if (i < this.activeIndex) {
                        this.barOffset += tab.clientWidth
                    }
                    if (i === this.activeIndex) {
                        this.barWidth = tab.clientWidth
                    }
                })
            }
        }
    }

    ngAfterViewInit(): void {
        this.tabsDom = this.tabsRef.nativeElement;
        setTimeout(() => this.setActive(this.activeIndex))
    }
}