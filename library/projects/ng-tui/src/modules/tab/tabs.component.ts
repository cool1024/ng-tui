import {
    Component,
    EventEmitter,
    Input,
    Output,
    AfterViewInit,
    ViewChildren,
    QueryList,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { TabsDirective } from './tab.directive';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-tabs',
    exportAs: 'tsTabs',
    template: `
    <div *ngIf="!this.isApply(cardType)" class="tabs tabs-{{color}}"
        [class.justify-content-end]="position==='end'"
        [class.justify-content-center]="position==='center'">
        <div class="tab-bar"
            [style.width.px]="tabBarWidth"
            [style.left.px]="offsetLeft">
        </div>
        <div #tabItem *ngFor="let tab of tabs;index as i"
            [class.active]="tab===activeTab"
            (click)="changeTab(tab)"
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
export class TabsComponent extends BaseTheme implements AfterViewInit, OnDestroy {

    @Input() tabs: Array<string>;

    @Input() activeTab: string;

    @Input() position: string;

    @Input() cardType: boolean;

    @Input() target: TabsDirective;

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
        window.addEventListener('resize', this.moveHandle);
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.moveHandle);
    }

    changeTab(tab: string) {
        this.activeTab = tab;
        this.moveHandle();
        if (this.target) {
            this.target.changeTab(this.activeTab || null);
        }
        this.tabChange.emit(tab);
    }

    moveHandle = () => {
        const activeIndex = this.tabs.indexOf(this.activeTab);
        this.moveActiveBar(activeIndex);
    }

    moveActiveBar(i: number) {
        // card mode not support
        if (this.isApply(this.cardType)) {
            return;
        }
        const tabs = this.tabDoms;
        this.offsetLeft = 0;
        this.offsetLeft = tabs[i].offsetLeft;
        this.tabBarWidth = tabs[i].clientWidth;
    }
}
