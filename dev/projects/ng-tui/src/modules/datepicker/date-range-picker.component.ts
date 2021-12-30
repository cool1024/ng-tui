import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateRange, DateObjRange } from './date-range.interface';
import { DateRangeComponent } from './date-range.component';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
  selector: 'ts-datepickers',
  exportAs: 'tsDatepickers',
  template: ` <div
      class="d-inline-block"
      tsToggle
      [target]="menuView"
      [bind]="menuView"
    >
      <ng-content></ng-content>
    </div>
    <div
      #menuView="tsView"
      (displayChange)="$event && this.dateRange.updateRangeShow()"
      [ngStyle]="{ zIndex: zIndex }"
      tsView
      class="bg-white shadow no-select p-3"
    >
      <ts-date-range
        [activeDates]="activeDates"
        (dateChange)="sendChange($event)"
        [color]="color"
      ></ts-date-range>
    </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickersComponent),
      multi: true,
    },
  ],
})
export class DatepickersComponent extends FormDirective {
  @Input() zIndex = 1;
  @ViewChild(DateRangeComponent) dateRange!: DateRangeComponent;

  activeDates = {
    start: null,
    end: null,
  };

  constructor(cfs: ConfigService) {
    super();
    this.color = cfs.config.defaultColor;
    this.activeDates.start = this.getTimeObj('') as any;
  }

  writeValue(value: DateRange): void {
    if (value && value.start) {
      this.activeDates.start = this.getTimeObj(value.start) as any;
    }
    if (value && value.start && value.end) {
      this.activeDates.end = this.getTimeObj(value.end) as any;
    }
    if (this.dateRange) {
      this.dateRange.updateRangeShow();
    }
  }

  getTimeObj(timeStr: string): { year: number; month: number; day: number } {
    let date = new Date(timeStr);
    try {
      if (!date.getFullYear()) {
        date = new Date();
      }
    } catch (e) {
      date = new Date();
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  sendChange(value: DateObjRange): void {
    console.log(value);
    const range: DateRange = {
      start: `${value.start.year}/${value.start.month}/${value.start.day}`,
      end: value.end
        ? `${value.end.year}/${value.end.month}/${value.end.day}`
        : '',
    };
    this.changeHandle(range);
  }
}
