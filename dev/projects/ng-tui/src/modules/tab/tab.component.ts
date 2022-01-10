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
  Directive,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { Menu } from '../../tui-core/interface/item.interface';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';
import { Util } from '../../tui-core/util';
import { TUI_CONST } from '../../tui-core/const';
@Directive({ selector: '*[tsTab]' })
export class TabItemDirective {
  set active(value: boolean) {
    if (this.e) {
      const e = this.e.nativeElement as HTMLElement;
      if (!value) {
        e.classList.add(TUI_CONST.BOOTSTRAP.CLASS.DISPLAY.NONE);
      } else {
        e.classList.remove(TUI_CONST.BOOTSTRAP.CLASS.DISPLAY.NONE);
      }
    }
  }

  constructor(private e: ElementRef) {}
}

@Component({
  selector: 'ts-tabs',
  exportAs: 'tsTabs',
  template: ` <div
      class="tabs tabs-{{ color }} no-select"
      [ngClass]="{ vertical: needVertical }"
      #tabDom
    >
      <div
        class="tab"
        *ngFor="let item of items; let i = index"
        [class.active]="activeIndex === i"
        (click)="setActive(i)"
      >
        <i *ngIf="itemIcon(item)" class="mr-1 {{ itemIcon(item) }}"></i>
        {{ itemText(item) }}
      </div>
      <div
        *ngIf="!needVertical"
        class="tab-bar"
        [style.left.px]="barOffset"
        [style.width.px]="barLength"
      ></div>
      <div
        *ngIf="needVertical"
        class="tab-bar"
        [style.top.px]="barOffset"
        [style.height.px]="barLength"
      ></div>
    </div>
    <ng-content></ng-content>`,
})
export class TabComponent
  extends ThemeDirective
  implements AfterViewInit, OnChanges
{
  @Input()
  items: Array<Menu | string> = [];

  @Input()
  activeIndex = 0;

  @Output()
  tabChange = new EventEmitter<number>(true);

  @ViewChild('tabDom')
  tabsRef!: ElementRef;

  @ContentChildren(TabItemDirective, { descendants: true })
  tabItems!: QueryList<TabItemDirective>;

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

  ngAfterViewInit(): void {
    this.tabsDom = this.tabsRef.nativeElement;
    setTimeout(() => this.setActive(this.activeIndex));
  }

  itemIcon(item: Menu | string): string {
    return typeof item === 'string' ? '' : item.icon || '';
  }

  itemText(item: Menu | string): string {
    return typeof item === 'string' ? item : item.text || '';
  }

  isActive(index: number): boolean {
    return index === this.activeIndex;
  }

  setActive(index: number): void {
    this.activeIndex = index;
    this.tabChange.emit(index);
    this.moveBar();
    this.updateTabItem(index);
  }

  moveBar(): void {
    if (this.tabsDom) {
      const tabItems = this.tabsDom.querySelectorAll('.tab');
      if (tabItems) {
        this.barOffset = 0;
        tabItems.forEach((tab, i) => {
          if (i < this.activeIndex) {
            this.barOffset += this.needVertical
              ? tab.clientHeight
              : tab.clientWidth;
          }
          if (i === this.activeIndex) {
            this.barLength = this.needVertical
              ? tab.clientHeight
              : tab.clientWidth;
          }
        });
      }
    }
  }

  updateTabItem(index: number): void {
    if (this.tabItems) {
      this.tabItems.forEach((tab, i) => {
        tab.active = i === index;
      });
    }
  }
}
