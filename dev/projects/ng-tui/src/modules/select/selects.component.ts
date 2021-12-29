import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { Item } from '../../tui-core/interface/item.interface';
import { ConfigService } from '../../tui-core/service/config.service';
import { Util } from '../../tui-core/util';
import { generateBox } from '../image/image';

@Component({
  selector: 'ts-selects',
  templateUrl: './selects.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectsComponent),
      multi: true,
    },
  ],
})
export class SelectsComponent extends FormDirective {
  @Input() options: Array<string | Item>;

  @Input() placeholder: string;

  @Input() emptyLabel: string;

  @Input() searchLabel: string;

  @Input() zIndex = 1;

  @Output() optionChange = new EventEmitter<Item[]>(false);

  searchKey: string;

  activeItems: Array<Item>;

  boxData = generateBox(30, 26);

  get items(): Item[] {
    const items = Util.formateOptions(this.options);
    return this.searchKey
      ? items.filter((e) => e.text.indexOf(this.searchKey) > -1)
      : items;
  }

  get values(): any[] {
    return this.activeItems.map<Item>((element) => element.value);
  }

  constructor(csf: ConfigService) {
    super();
    this.color = csf.config.defaultColor;
    this.placeholder = 'select...';
    this.searchKey = '';
    this.options = [];
    this.activeItems = [];
    this.emptyLabel = 'No results found.';
    this.searchLabel = 'search...';
  }

  writeValue(values: any[]): void {
    if (values === null || values === undefined) {
      values = [];
    }
    const items = Util.formateOptions(this.options) || [];
    this.activeItems = items.filter((item) => ~values.indexOf(item.value));
  }

  onShowMenu(event: boolean): void {
    this.searchKey = '';
  }

  setValue(item: Item): void {
    const index = this.activeItems.indexOf(item);
    if (index < 0) {
      this.activeItems.push(item);
    } else {
      this.activeItems.splice(index, 1);
    }
    this.changeHandle && this.changeHandle(this.values);
    this.optionChange.emit(this.activeItems);
  }

  isActiveItem(item: Item): boolean {
    return this.activeItems.indexOf(item) >= 0;
  }

  trackByValue(index: number, item: Item): number {
    return item.value;
  }
}
