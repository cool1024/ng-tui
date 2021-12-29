import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  forwardRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { Item } from '../../tui-core/interface/item.interface';
import { ConfigService } from '../../tui-core/service/config.service';
import { generateBox } from '../image/image';

@Component({
  selector: 'ts-select',
  templateUrl: './select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  extends FormDirective
  implements OnChanges, AfterViewInit
{
  title: string;

  searchKey: string;

  readonly: string;

  value: any;

  subject = new Subject<string>();

  boxData = generateBox(30, 26);

  @Input() zIndex = 1;

  @Input() options: Array<string | Item>;

  @Input() placeholder: string;

  @Input() emptyLabel: string;

  @Input() searchFunc!: (key: string) => Observable<Item[]>;

  @Output() optionChange = new EventEmitter<any>(false);

  constructor(private elementRef: ElementRef, csf: ConfigService) {
    super();
    this.color = csf.config.defaultColor;
    this.readonly = 'readonly';
    this.placeholder = 'select...';
    this.searchKey = '';
    this.title = '';
    this.options = [];
    this.emptyLabel = 'No results found.';
    // tslint:disable-next-line: deprecation
    this.subject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((key) => {
        return (
          this.searchFunc &&
          // tslint:disable-next-line: deprecation
          this.searchFunc(key).subscribe((options) => {
            this.options = options;
          })
        );
      });
  }

  get optionsList(): Array<Item> {
    let options = this.formatoptions;
    if (this.searchKey && !this.searchFunc) {
      options = options.filter((e) => e.text.indexOf(this.searchKey) > -1);
    }
    return options;
  }

  get formatoptions(): Array<Item> {
    const options = new Array<any>();
    if (this.options.length > 0) {
      this.options.forEach((e) => {
        options.push(
          typeof e === 'string' || typeof e === 'number'
            ? { value: e, text: e }
            : e
        );
      });
    }
    return options;
  }

  ngOnChanges(): void {
    this.setTitle();
  }

  ngAfterViewInit(): void {
    const div: HTMLElement = this.elementRef.nativeElement;
    div.classList.add('form-control', 'p-0', 'border-0');
  }

  writeValue(value: any): void {
    this.value = value;
    this.setTitle();
  }

  trackByValue(index: number, item: Item): number {
    return item.value;
  }

  setReadonlyStatus(status: boolean): void {
    this.readonly = (status ? null : 'readonly') as any;
    if (status === false && this.searchKey.length > 0) {
      this.setTitle();
      this.searchKey = '';
    }
  }

  setValue(item: Item): void {
    this.readonly = 'readonly';
    this.value = item.value;
    this.title = item.text;
    this.searchKey = '';
    this.optionChange.emit(item);
    // tslint:disable-next-line:no-unused-expression
    this.changeHandle && this.changeHandle(this.value);
  }

  setSearchKey(value: string): void {
    this.searchKey = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    this.subject.next(this.searchKey);
  }

  setTitle(): void {
    const options = this.formatoptions;
    if (this.value !== undefined && this.value != null) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === this.value) {
          this.title = options[i].text;
          return;
        }
      }
    }
    this.title = '';
  }
}
