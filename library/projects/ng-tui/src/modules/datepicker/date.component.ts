import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../../tui-core/base-services/config.service';

const WEEK_DAY_NUM = 7;
const MIN_YEAR = 1000;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

@Component({
    selector: 'ts-date',
    template: ``,
    styles: [
        `
        .ts-box {
            min-width: 300px;
            box-shadow: 1px 2px 3px rgb(200, 200, 200);
        }
        .ts-datepicker-table {
            margin: auto auto;
        }
        .ts-month-title {
            padding-left: 15px;
            padding-top: 15px;
            font-size: 15px;
        }
        .ts-weeks {
            border-bottom: 1px solid rgb(245, 245, 245);
        }
        .ts-weeks th {
            padding-bottom: 10px;
        }
        .ts-day {
            width: 35px;
            height: 35px;
            line-height: 35px;
        }
        .ts-day-hover:hover {
            background-color: #eee;
        }
        th {
            font-weight: normal;
            font-family: Microsoft YaiHei, 微软雅黑, KaiTi;
        }
        td {
            cursor: pointer;
        }`
    ]
})
export class DatepickerComponent {

    @Input() weekTitles: string[];

    @Input() monthTitles: string[];

    @Input() date: Date;

    @Output() dateChange = new EventEmitter<Date>(false);

    year: number;

    month: number;

    day: number;

    get days(): number[] {
        let date = new Date(this.year, this.month, 0);
        const dayTotal = date.getDate();
        const days = new Array<number>();
        date = new Date(this.year, this.month - 1, 1);
        const week = date.getDay() || WEEK_DAY_NUM;
        for (let i = 0; i < week - 1; i++) { days.push(0); }
        for (let i = 1; i <= dayTotal; i++) { days.push(i); }
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
            years.push(this.year - 3 + i);
        }
        years.push(this.year);
        for (let i = 0; i < 3; i++) {
            years.push(this.year + 1 + i);
        }
        return years;
    }

    constructor(configService: ConfigService) {

        // labels
        this.weekTitles = configService.config.weekTitles;
        this.monthTitles = configService.config.monthTitles;

        // tody
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
    }

    // writeValue(value: any) {
    //     this.value = value;
    //     let date = new Date(this.value);
    //     if (!date.getFullYear()) {
    //         date = new Date();
    //     }
    //     this.year = date.getFullYear();
    //     this.month = date.getMonth() + 1;
    //     this.day = date.getDate();
    //     this.setValue();
    // }

    getMonth(month: number): string {
        return this.monthTitles[month - 1];
    }

    setDay(day: number): void {
        if (day <= 0) { return; }
        this.day = day;
        this.setValue();
        this.dateChange.emit(this.date);
    }

    setValue() {
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.date.setDate(this.day);
    }


    isActiveDay(day: number): boolean {
        return true;
    }

    nextMonth() {
        if (this.month < MAX_MONTH) {
            this.month++;
        } else {
            this.year++;
            this.month = MIN_MONTH;
        }
        this.setValue();
    }

    prevMonth() {
        if (this.month > MIN_MONTH) {
            this.month--;
        } else if (this.year > MIN_YEAR) {
            this.year--;
            this.month = MAX_MONTH;
        }
        this.setValue();
    }

    nextYear() {
        this.year++;
        this.setValue();
    }

    prevYear() {
        if (this.year > MIN_YEAR) {
            this.year--;
        }
        this.setValue();
    }

    trackByFn(item: any): number {
        return item.length;
    }
}
