import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnChanges,
    Output,
    EventEmitter,
    SimpleChanges,
} from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { TabItem } from '../../tui-core/interface/item.interface';
import { ConfigService } from '../../tui-core/service/config.service';
import { Util } from '../../tui-core/util';

@Component({
    selector: 'ts-tabs',
    exportAs: 'tsTabs',
    template: ` <div class="tabs tabs-{{ color }}" [ngClass]="{ vertical: needVertical }" #tabDom>
            <div
                class="tab"
                *ngFor="let item of items; let i = index"
                [class.active]="activeIndex === i"
                (click)="setActive(i)"
            >
                <i *ngIf="itemIcon(item)" class="mr-1 {{ itemIcon(item) }}"></i>
                {{ itemText(item) }}
            </div>
            <div *ngIf="!needVertical" class="tab-bar" [style.left.px]="barOffset" [style.width.px]="barLength"></div>
            <div *ngIf="needVertical" class="tab-bar" [style.top.px]="barOffset" [style.height.px]="barLength"></div>
        </div>
        <ng-content></ng-content>`,
})
export class TabComponent extends ThemeDirective implements AfterViewInit, OnChanges {
    @Input()
    items: Array<TabItem | string> = [];

    @Input()
    activeIndex = 0;

    @Output()
    tabChange = new EventEmitter<number>(true);

    @ViewChild('tabDom')
    tabsRef!: ElementRef;

    tabsDom!: HTMLDivElement;
    barOffset = 0;
    barLength = 0;

    constructor(private configService: ConfigService) {
        super();
        this.color = this.configService.config.defaultColor;
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (Util.notNull(changes.activeIndex)) {
            setTimeout(() => this.setActive(this.activeIndex));
        }
    }

    itemIcon(item: TabItem | string): string {
        return typeof item === 'string' ? '' : item.icon || '';
    }

    itemText(item: TabItem | string): string {
        return typeof item === 'string' ? item : item.text || '';
    }

    isActive(index: number): boolean {
        return index === this.activeIndex;
    }

    setActive(index: number): void {
        this.activeIndex = index;
        this.tabChange.emit(index);
        this.moveBar();
    }

    moveBar(): void {
        if (this.tabsDom) {
            const tabItems = this.tabsDom.querySelectorAll('.tab');
            if (tabItems) {
                this.barOffset = 0;
                tabItems.forEach((tab, i) => {
                    if (i < this.activeIndex) {
                        this.barOffset += this.needVertical ? tab.clientHeight : tab.clientWidth;
                    }
                    if (i === this.activeIndex) {
                        this.barLength = this.needVertical ? tab.clientHeight : tab.clientWidth;
                    }
                });
            }
        }
    }

    ngAfterViewInit(): void {
        this.tabsDom = this.tabsRef.nativeElement;
        setTimeout(() => this.setActive(this.activeIndex));
    }
}
