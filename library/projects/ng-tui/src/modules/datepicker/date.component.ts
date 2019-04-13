import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
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
export class DateComponent extends BaseTheme implements OnChanges {

    @Input() weekTitles: string[];
    @Input() monthTitles: string[];
    @Input() activeDate: string;
    @Output() dateChange = new EventEmitter<string>(false);

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

        super();

        this.color = configService.config.defaultColor;

        // labels
        this.weekTitles = configService.config.weekTitles;
        this.monthTitles = configService.config.monthTitles;

        // tody
        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();

        // active day
        this.activeDate = `${this.year}/${this.month}/${this.day}`;
    }

    ngOnChanges() {
        let date;
        try {
            date = new Date(this.activeDate);
            if (date.getFullYear()) {
                this.year = date.getFullYear();
                this.month = date.getMonth() + 1;
            }
        } catch (e) {}
    }


    getMonth(month: number): string {
        return this.monthTitles[month - 1];
    }

    setDay(day: number): void {
        if (day <= 0) { return; }
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
    }

    prevYear() {
        if (this.year > MIN_YEAR) {
            this.year--;
        }
    }

    updateActiveDay() {
        this.activeDate = `${this.year}/${this.month}/${this.day}`;
        this.dateChange.emit(this.activeDate);
    }

    trackByFn(item: any): number {
        return item.length;
    }
}
