import {
    Component,
    EventEmitter,
    Input,
    Output,
    AfterViewInit,
    ViewChildren,
    QueryList,
    ElementRef,
} from '@angular/core';
import { TabsDirective } from './tab.directive';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-tabs',
    template: `
    <div *ngIf="!this.isApply(cardType)" class="tabs tabs-{{color}}">
        <div class="tab-bar" [style.width.px]="tabBarWidth" [style.left.px]="offsetLeft"></div>
        <div #tabItem *ngFor="let tab of tabs;index as i"
            [class.active]="tab===activeTab"
            (click)="changeTab(tab,i)"
            class="tab">
            {{tab}}
        </div>
    </div>
    <ul *ngIf="this.isApply(cardType)"
        class="nav nav-tabs" [class.justify-content-end]="position==='end'" [class.justify-content-center]="position==='center'">
        <li *ngFor="let tab of tabs" class="nav-item pointer">
            <span class="nav-link nav-link-{{color}}"
                [class.active]="tab===activeTab"
                (click)="changeTab(tab)">{{tab}}</span>
        </li>
    </ul>`
})
export class TabComponent extends BaseTheme implements AfterViewInit {

    @Input() tabs: Array<string>;

    @Input() activeTab: string;

    @Input() position: string;

    @Input() cardType: boolean;

    @Input() target: TabsDirective;

    @Input() tabType: string;

    @Output() tabChange = new EventEmitter<string>();

    @ViewChildren('tabItem') tabItems: QueryList<ElementRef>;

    tabBarWidth = 0;

    offsetLeft = 0;

    get tabDoms(): HTMLDivElement[] {
        return this.tabItems.toArray().map(item => item.nativeElement);
    }

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }

    ngAfterViewInit() {
        if (this.target) {
            this.target.changeTab(this.activeTab || null);
        }
        const activeIndex = this.tabs.indexOf(this.activeTab);
        setTimeout(() => activeIndex > -1 && this.moveActiveBar(activeIndex));
    }

    changeTab(tab: string, i: number = null) {
        if (typeof i === 'number') {
            this.moveActiveBar(i);
        }
        this.activeTab = tab;
        if (this.target) {
            this.target.changeTab(this.activeTab || null);
        }
        this.tabChange.emit(tab);
    }

    moveActiveBar(i: number) {
        const tabs = this.tabDoms;
        this.offsetLeft = 0;
        for (let j = 0; j < i; j++) {
            this.offsetLeft += tabs[j].clientWidth;
        }
        this.tabBarWidth = tabs[i].clientWidth;
    }
}
