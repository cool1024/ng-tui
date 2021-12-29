import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Item } from '../../tui-core/interface/item.interface';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';
import { styleStr } from './style';

const WEEK_DAY_NUM = 7;
const MIN_YEAR = 1000;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

@Component({
  selector: 'ts-date',
  templateUrl: './date.html',
  styles: [styleStr],
})
export class DateComponent extends ThemeDirective implements OnChanges {
  @Input() weekTitles: string[];
  @Input() monthTitles: Item[];
  @Input() activeDate: string;
  @Output() dateChange = new EventEmitter<string>();
  @Output() objectChange = new EventEmitter<any>();

  year: number;
  month: number;
  day: number;
  showYear: number;

  get days(): number[] {
    let date = new Date(this.year, this.month, 0);
    const dayTotal = date.getDate();
    const days = new Array<number>();
    date = new Date(this.year, this.month - 1, 1);
    const week = date.getDay();
    for (let i = 0; i < week; i++) {
      days.push(0);
    }
    for (let i = 1; i <= dayTotal; i++) {
      days.push(i);
    }
    return days;
  }

  get trList(): Array<number[]> {
    const days = this.days;
    const groupNum = Math.ceil(days.length / WEEK_DAY_NUM);
    const trs = new Array<number[]>();
    for (let i = 0; i < groupNum; i++) {
      trs[i] = new Array<number>();
      for (let j = 0; j < WEEK_DAY_NUM; j++) {
        trs[i][j] = days[i * WEEK_DAY_NUM + j] || 0;
      }
    }
    return trs;
  }

  get yearList(): Array<number> {
    const years = [];
    for (let i = 0; i < 3; i++) {
      years.push(this.showYear - 3 + i);
    }
    years.push(this.showYear);
    for (let i = 0; i < 3; i++) {
      years.push(this.showYear + 1 + i);
    }
    return years;
  }

  constructor(configService: ConfigService) {
    super();

    this.color = configService.config.defaultColor;

    // labels
    this.weekTitles = configService.config.weekTitles as any;
    this.monthTitles = configService.config.monthTitles.map((e, i) => ({
      text: e,
      value: i + 1,
    }));

    // tody
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.showYear = this.year;

    // active day
    this.activeDate = `${this.year}/${this.month}/${this.day}`;
  }

  ngOnChanges() {
    try {
      let date = new Date();
      if (this.activeDate) {
        date = new Date(this.activeDate);
      }
      if (date.getFullYear()) {
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.showYear = this.year;
      }
    } catch (e) {
      console.error('date format error', e);
    }
  }

  getMonth(month: number): string {
    return this.monthTitles[month - 1].text;
  }

  setDay(day: number): void {
    if (day <= 0) {
      return;
    }
    this.day = day;
    this.updateActiveDay();
  }

  isActiveDay(day: number): boolean {
    return this.activeDate === `${this.year}/${this.month}/${day}`;
  }

  nextMonth() {
    if (this.month < MAX_MONTH) {
      this.month++;
    } else {
      this.year++;
      this.month = MIN_MONTH;
    }
  }

  prevMonth() {
    if (this.month > MIN_MONTH) {
      this.month--;
    } else if (this.year > MIN_YEAR) {
      this.year--;
      this.month = MAX_MONTH;
    }
  }

  nextYear() {
    this.year++;
    this.showYear = this.year;
  }

  prevYear() {
    if (this.year > MIN_YEAR) {
      this.year--;
      this.showYear = this.year;
    }
  }

  updateActiveDay() {
    this.activeDate = `${this.year}/${this.month}/${this.day}`;
    this.dateChange.emit(this.activeDate);
    this.objectChange.emit({
      year: this.year,
      month: this.month,
      day: this.day,
    });
  }

  changeMonth(item: Item) {
    this.month = item.value;
  }

  changeYear(year: number) {
    this.year = year;
    this.showYear = this.year;
  }

  wheelYear(value: number) {
    return value < 0 ? this.showYear-- : this.showYear++;
  }

  trackByFn(item: any): number {
    return item.length;
  }
}
