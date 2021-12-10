import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { Item } from '../../tui-core/interface/item.interface';
import { ConfigService } from '../../tui-core/service/config.service';
import { Util } from '../../tui-core/util';

@Component({
  selector: 'ts-dropdown',
  template: `
    <div tsToggle [target]="menuView" class="d-inline-block">
      <ng-content></ng-content>
    </div>
    <div
      #menuView="tsView"
      [tsView]="isApply(dropup) ? 'top' : 'bottom'"
      [ngStyle]="{ minWidth: minWidth + 'px', zIndex: zIndex }"
      [fitWidth]="fitWidth"
      [offsetX]="offsetX"
      [offsetY]="offsetY"
      (wheel)="itemWheel($event.deltaY)"
      class="bg-white shadow no-select py-2"
    >
      <div
        *ngFor="let item of itemList; trackBy: trackByValue"
        (click)="itemClick(item)"
        class="pointer px-3 py-1 {{ bgHoverClass }}"
        [class.active]="activeValue === item.value"
        close
      >
        {{ item.text }}
      </div>
    </div>
  `,
})
export class DropdownComponent extends ThemeDirective implements OnChanges {
  @Input() items: Array<Item | string | number>;

  @Input() dropup: string | null;

  @Input() offsetX: number;

  @Input() offsetY: number;

  @Input() minWidth: number;

  @Input() zIndex: number;

  @Input() fitWidth: boolean;

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
    this.fitWidth = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && changes.items.currentValue) {
      this.itemList = Util.formateItems(changes.items.currentValue);
    }
  }

  itemClick(item: Item): void {
    this.activeValue = item.value;
    this.menuClick.emit(item);
  }

  itemWheel(value: number): void {
    this.menuWheel.emit(value);
  }

  isApply(value: any): boolean {
    return (
      !!value ||
      (value !== undefined && value !== null && value.toString() === '')
    );
  }

  trackByValue(_: number, item: Item): number {
    return item.value;
  }
}
