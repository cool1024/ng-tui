import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { styleStr } from './style';

const WEEK_DAY_NUM = 7;
const MIN_YEAR = 1000;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

@Component({
    selector: 'ts-date-range',
    exportAs: 'tsDateRange',
    templateUrl: './date-range.html',
    styles: [styleStr]
})
export class DateRangeComponent extends BaseTheme {

    @Input() weekTitles: string[];
    @Input() monthTitles: string[];
    @Input() activeDates = {
        start: null,
        end: null
    };
    @Output() dateChange = new EventEmitter<any>(false);

    years: [number, number];
    months: [number, number];
    days: [number[][], number[][]];

    // days(): number[] {
    //     let date = new Date(this.year, this.month, 0);
    //     const dayTotal = date.getDate();
    //     const days = new Array<number>();
    //     date = new Date(this.year, this.month - 1, 1);
    //     const week = date.getDay() || WEEK_DAY_NUM;
    //     for (let i = 0; i < week - 1; i++) { days.push(0); }
    //     for (let i = 1; i <= dayTotal; i++) { days.push(i); }
    //     return days;
    // }

    // get trList(): Array<number[]> {
    //     const days = this.days;
    //     const groupNum = Math.ceil(days.length / WEEK_DAY_NUM);
    //     const trs = new Array<number[]>();
    //     for (let i = 0; i < groupNum; i++) {
    //         trs[i] = new Array<number>();
    //         for (let j = 0; j < WEEK_DAY_NUM; j++) {
    //             trs[i][j] = days[i * WEEK_DAY_NUM + j] || 0;
    //         }
    //     }
    //     return trs;
    // }

    getYearList(year: number): Array<number> {
        const years = [];
        for (let i = 0; i < 3; i++) {
            years.push(year - 3 + i);
        }
        years.push(year);
        for (let i = 0; i < 3; i++) {
            years.push(year + 1 + i);
        }
        return years;
    }

    constructor(configService: ConfigService) {

        super();

        this.color = configService.config.defaultColor;

        // labels
        this.weekTitles = configService.config.weekTitles;
        this.monthTitles = configService.config.monthTitles;

        // tody
        const date = new Date();
        this.years[0] = date.getFullYear();
        this.months[0] = date.getMonth() + 1;

        // active day
        this.activeDates.start = {
            year: this.years[0],
            month: this.months[0],
            day: date.getDate()
        };
        this.activeDates.end = null;
    }

    // updateRangeShow() {
    //     this.month = this.activeDates.start.month;
    //     this.year = this.activeDates.start.year;
    // }


    getMonth(month: number): string {
        return this.monthTitles[month - 1];
    }

    setDate(date: any) {
        const dateTime = new Date(`${date.year}/${date.month}/${date.day}`).getTime();
        const activeStartTime = new Date(`${this.activeDates.start.year}/${this.activeDates.start.month}/${this.activeDates.start.day}`).getTime();
        if (this.activeDates.end != null) {
            this.activeDates.start = date;
            this.activeDates.end = null;
        } else if (activeStartTime > dateTime) {
            this.activeDates.end = this.activeDates.start;
            this.activeDates.start = date;
        } else {
            this.activeDates.end = date;
        }
    }

    // setDay(day: number): void {
    //     if (day <= 0) { return; }
    //     const date = { year: this.year, month: this.month, day: day };
    //     const dateTime = new Date(`${date.year}/${date.month}/${date.day}`).getTime();
    //     const activeStartTime = new Date(`${this.activeDates.start.year}/${this.activeDates.start.month}/${this.activeDates.start.day}`).getTime();
    //     if (this.activeDates.end != null) {
    //         this.activeDates.start = date;
    //         this.activeDates.end = null;
    //     } else if (activeStartTime > dateTime) {
    //         this.activeDates.end = this.activeDates.start;
    //         this.activeDates.start = date;
    //     } else {
    //         this.activeDates.end = date;
    //     }
    // }

    // isActiveDay(day: number): boolean {
    //     return (this.activeDates.start != null
    //         && this.year == this.activeDates.start.year
    //         && this.month == this.activeDates.start.month
    //         && day == this.activeDates.start.day)
    //         || (this.activeDates.end != null
    //             && this.year == this.activeDates.end.year
    //             && this.month == this.activeDates.end.month
    //             && day == this.activeDates.end.day);
    // }

    // inRange(day: number) {
    //     if (this.activeDates.end == null) {
    //         return false;
    //     }
    //     const date = { year: this.year, month: this.month, day: day };
    //     const dateTime = new Date(`${date.year}/${date.month}/${date.day}`).getTime();
    //     const activeStartTime = new Date(`${this.activeDates.start.year}/${this.activeDates.start.month}/${this.activeDates.start.day}`).getTime();
    //     const activeEndTime = new Date(`${this.activeDates.end.year}/${this.activeDates.end.month}/${this.activeDates.end.day}`).getTime();
    //     return dateTime > activeStartTime && dateTime < activeEndTime;
    // }

    // nextMonth() {
    //     if (this.month < MAX_MONTH) {
    //         this.month++;
    //     } else {
    //         this.year++;
    //         this.month = MIN_MONTH;
    //     }
    // }

    // prevMonth() {
    //     if (this.month > MIN_MONTH) {
    //         this.month--;
    //     } else if (this.year > MIN_YEAR) {
    //         this.year--;
    //         this.month = MAX_MONTH;
    //     }
    // }

    // nextYear() {
    //     this.year++;
    // }

    // prevYear() {
    //     if (this.year > MIN_YEAR) {
    //         this.year--;
    //     }
    // }

    updateRange() {
        this.dateChange.emit(this.activeDates);
    }

    trackByFn(item: any): number {
        return item.length;
    }

    getDateStr(date: any) {
        return `${date.year}/${date.month}/${date.day}`;
    }
}
