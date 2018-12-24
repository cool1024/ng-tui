import { Input, Component, ContentChildren, QueryList, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { TabsDirective } from './tab.directive';

@Component({
    selector: 'ts-tab',
    template: `<div #content (click)="clickHandle(this)" class="tab w-100"><ng-content></ng-content></div>`
})
export class TabComponent implements AfterViewInit {
    @Input() value: any;
    @Input() active: boolean;
    @ViewChild('content') set _dom(elf: ElementRef) { this.dom = elf.nativeElement; }
    dom: HTMLDivElement;
    clickHandle = (that: TabComponent) => { };

    ngAfterViewInit() {
        // tslint:disable-next-line:no-unused-expression
        this.active && this.clickHandle(this);
    }
}

@Component({
    selector: 'ts-side-tabs',
    exportAs: 'tsSideTabs',
    template: `
    <div class="tabs-side tabs-{{color}} flex-column">
        <div class="side-bar {{isApply('right')?'right':'left'}}"
            [style.height.px]="tabBarHeight"
            [style.top.px]="offsetTop">
        </div>
        <ng-content></ng-content>
    </div>`,
})
export class SideTabsComponent extends BaseTheme implements AfterViewInit, OnDestroy {

    tabBarHeight = 0;
    offsetTop = 0;
    activeValue: any;
    activeIndex: number;
    tabs: Array<TabComponent>;
    right: string;
    @Input() target: TabsDirective;
    @ContentChildren(TabComponent) set _tabs(tabs: QueryList<TabComponent>) {
        this.tabs = tabs.toArray();
        this.tabs.forEach(tab => tab.clickHandle = (cmp: TabComponent) => {
            this.changeTab(cmp);
        });
    }

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }

    ngAfterViewInit() {
        window.addEventListener('resize', this.moveHandle);
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.moveHandle);
    }

    moveHandle = () => {
        this.moveActiveBar(this.activeIndex);
    }

    changeTab(cmp: TabComponent) {
        this.activeValue = cmp.value;
        this.activeIndex = this.tabs.indexOf(cmp);
        this.tabs.forEach(item => item.dom.classList.remove('active'));
        this.moveActiveBar(this.activeIndex);
    }

    moveActiveBar(i: number) {
        const tab = this.tabs[i];
        tab.dom.classList.add('active');
        setTimeout(() => {
            if (this.target) {
                this.target.changeTab(this.activeIndex || 0);
            }
            this.tabBarHeight = tab.dom.clientHeight;
            this.offsetTop = tab.dom.offsetTop;
        });
    }
}
