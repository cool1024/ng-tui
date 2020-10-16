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
    @Input() confirmTitle: string;
    @Input() activeDates = {
        start: null,
        end: null
    };
    @Output() dateChange = new EventEmitter<any>(false);

    years: [number, number];
    months: [number, number];
    days: [number[][], number[][]];
    yearList: [number[], number[]];

    updateDays() {
        let dates = [new Date(this.years[0], this.months[0], 0), new Date(this.years[1], this.months[1], 0)];
        const dayTotals = [dates[0].getDate(), dates[1].getDate()];
        const days = [[], []];
        days.forEach((e, j) => {
            dates[j] = new Date(this.years[j], this.months[j] - 1, 1);
            const week = dates[j].getDay();
            for (let i = 0; i < week; i++) { e.push(0); }
            for (let i = 1; i <= dayTotals[j]; i++) { e.push(i); }
        });
        const trs = days.map((e, _) => {
            const groupNum = Math.ceil(e.length / WEEK_DAY_NUM);
            const trs = new Array<number[]>();
            for (let i = 0; i < groupNum; i++) {
                trs[i] = new Array<number>();
                for (let j = 0; j < WEEK_DAY_NUM; j++) {
                    trs[i][j] = e[i * WEEK_DAY_NUM + j] || 0;
                }
            }
            return trs;
        });
        this.days = [trs[0], trs[1]];
    }

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

    updateYears() {
        this.yearList = [
            this.getYearList(this.years[0]),
            this.getYearList(this.years[1])
        ];

    }

    updateAll() {
        this.updateDays();
        this.updateYears();
    }

    constructor(configService: ConfigService) {

        super();

        this.color = configService.config.defaultColor;

        // labels
        this.weekTitles = configService.config.weekTitles;
        this.monthTitles = configService.config.monthTitles;
        this.confirmTitle = configService.config.pickerConfirmTitle

        // tody
        const date = new Date();
        this.years = [date.getFullYear(), date.getFullYear()];
        this.months = [date.getMonth() + 1, date.getMonth() + 2];
        if (this.months[1] > MAX_MONTH) {
            this.years[1]++;
            this.months[1] = MIN_MONTH;
        }

        // active day
        this.activeDates.start = {
            year: this.years[0],
            month: this.months[0],
            day: date.getDate()
        };
        this.activeDates.end = null;

        // update
        // this.updateDays();
        // this.updateYears();
        this.updateAll();
    }

    updateRangeShow() {
        this.updateYear(this.activeDates.start.year);
        this.updateMonth(this.activeDates.start.month);
    }


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

    setDay(year: number, month: number, day: number): void {
        if (day <= 0) { return; }
        const date = { year, month, day };
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

    isActiveDay(year: number, month: number, day: number): boolean {
        return this.isStartDay(year, month, day) || this.isEndDay(year, month, day);
    }

    isStartDay(year: number, month: number, day: number): boolean {
        return (this.activeDates.start != null
            && year == this.activeDates.start.year
            && month == this.activeDates.start.month
            && day == this.activeDates.start.day);
    }

    isEndDay(year: number, month: number, day: number): boolean {
        return (this.activeDates.end != null
            && year == this.activeDates.end.year
            && month == this.activeDates.end.month
            && day == this.activeDates.end.day);
    }

    inRange(year: number, month: number, day: number) {
        if (this.activeDates.end == null) {
            return false;
        }
        const date = { year, month, day };
        const dateTime = new Date(`${date.year}/${date.month}/${date.day}`).getTime();
        const activeStartTime = new Date(`${this.activeDates.start.year}/${this.activeDates.start.month}/${this.activeDates.start.day}`).getTime();
        const activeEndTime = new Date(`${this.activeDates.end.year}/${this.activeDates.end.month}/${this.activeDates.end.day}`).getTime();
        return dateTime >= activeStartTime && dateTime <= activeEndTime;
    }

    nextMonth() {
        if (this.months[0] < MAX_MONTH) {
            this.months[0]++;
        } else {
            this.years[0]++;
            this.months[0] = MIN_MONTH;
        }
        this.updateMonth(this.months[0]);
    }

    prevMonth() {
        if (this.months[0] > MIN_MONTH) {
            this.months[0]--;
        } else if (this.years[0] > MIN_YEAR) {
            this.years[0]--;
            this.months[0] = MAX_MONTH;
        }
        this.updateMonth(this.months[0]);
    }

    updateMonth(month: number | string) {
        let monthIndex = 0;
        if (typeof month === 'string') {
            monthIndex = this.monthTitles.indexOf(month)
        }
        if (typeof month === 'number') {
            monthIndex = month
        }
        this.months[0] = monthIndex;
        this.months[1] = month === MAX_MONTH ? MIN_MONTH : monthIndex + 1;
        this.updateYear(this.years[0]);
    }

    nextYear() {
        this.updateYear(this.years[0] + 1);
        this.updateAll();
    }

    prevYear() {
        if (this.years[0] > MIN_YEAR) {
            this.updateYear(this.years[0] - 1);
        }
        this.updateAll();
    }

    updateYear(year: number) {
        this.years[0] = year;
        this.years[1] = this.months[0] === MAX_MONTH ? this.years[0] + 1 : this.years[0];
        this.updateAll();
    }

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
