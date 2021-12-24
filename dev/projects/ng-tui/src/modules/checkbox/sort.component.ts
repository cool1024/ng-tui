import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
  selector: 'ts-sort',
  template: ` <div
    (click)="toggle()"
    class="pointer no-select d-inline-block ts-sort"
  >
    <div class="{{ statusIndex === 2 ? 'text-' + color : 'text-muted' }}">
      ▲
    </div>
    <div class="{{ statusIndex === 0 ? 'text-' + color : 'text-muted' }}">
      ▼
    </div>
    <br />
  </div>`,
  styles: [
    `
      .ts-sort {
        line-height: 12px;
        font-size: 16px;
        height: 24px;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SortComponent),
      multi: true,
    },
  ],
})
export class SortComponent extends FormDirective {
  @Input() color: string;
  statusIndex: number;

  private values = [-1, 0, 1];

  constructor(private configService: ConfigService) {
    super();
    this.statusIndex = 1;
    this.color = this.configService.config.defaultColor;
  }

  writeValue(value: number): void {
    const index = this.values.indexOf(value);
    if (index >= 0) {
      this.statusIndex = index;
    }
  }

  toggle(): void {
    if (this.isDisabled) {
      return;
    }
    this.statusIndex = ++this.statusIndex % this.values.length;
    // tslint:disable-next-line:no-unused-expression
    this.changeHandle && this.changeHandle(this.values[this.statusIndex]);
  }
}
