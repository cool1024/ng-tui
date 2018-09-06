import { Component, Input, ElementRef, ViewChild, OnDestroy, forwardRef } from '@angular/core';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';
import { Toggle } from '../../tui-core/interfaces/toggle.interface';
import { ToggleDirective } from '../../tui-core/directives/toggle.directives';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ConfigService } from '../../tui-core/base-services/config.service';

const WEEK_DAY_NUM = 7;
const MIN_YEAR = 1000;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

@Component({
    selector: 'ts-datepicker',
    template: `
    <div [ngClass]="{'d-none':!show}" #pad class="fixed-top h-100 w-100" (click)="tryClose($event)">
        <div class="card rounded-0 border-0 ts-box" [ngStyle]="datepickerStyle">
            <div class="card-body">
                <table class="ts-datepicker-table">
                    <thead>
                        <tr class="ts-weeks">
                            <th class="text-center" *ngFor="let title of weekTitles;index as i">{{title}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-muted ts-month-title" colspan="7">{{getMonth(month)}} </td>
                        </tr>
                        <tr *ngFor="let tr of trList;trackBy: trackByFn" class="text-dark">
                            <td class="text-center" *ngFor="let td of tr">
                                <div (click)="setDay(td)"
                                class="ts-day rounded-circle
                                {{!isActiveDay(td)||('bg-'+color)}}" [class.text-white]="isActiveDay(td)"
                                    [class.ts-day-hover]="td">{{td||''}}</div>
                            </td>
                        </tr>
                        <tr *ngIf="trList.length<5" class="text-dark">
                            <td class="ts-day" colspan="7">&nbsp;</td>
                        </tr>
                        <tr *ngIf="trList.length<6" class="text-dark">
                            <td class="ts-day" colspan="7">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="text-right" colspan="7">
                                <div class="btn-group">
                                    <button (click)="prevYear()" class="btn btn-{{color}} btn-sm">
                                        <i class="iconfont icon-preview" aria-hidden="true"></i>
                                    </button>
                                    <ts-dropdown diyClass="btn btn-{{color}} dropdown-toggle btn-sm rounded-0 border-left-0 border-right-0"
                                                [items]="yearList" [(value)]="year"
                                                [useNumber]="0"
                                                [color]="color" dropup>
                                    </ts-dropdown>
                                    <button (click)="nextYear()" class="btn btn-{{color}} btn-sm">
                                        <i class="iconfont icon-next" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="btn-group ml-1">
                                    <button (click)="prevMonth()" class="btn btn-{{color}} btn-sm">
                                        <i class="iconfont icon-preview" aria-hidden="true"></i>
                                    </button>
                                    <ts-dropdown diyClass="btn btn-{{color}} dropdown-toggle btn-sm rounded-0 border-left-0 border-right-0"
                                        [items]="monthTitles"
                                        [(value)]="month" [useNumber]="1" [color]="color" dropup></ts-dropdown>
                                    <button (click)="nextMonth()" class="btn btn-{{color}} btn-sm">
                                        <i class="iconfont icon-next" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`,
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
    ],
    exportAs: 'tsDatepicker',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatepickerComponent),
        multi: true
    }]
})
export class DatepickerComponent implements OnDestroy, Toggle, ControlValueAccessor {

    @Input() weekTitles: string[];

    @Input() color: string;

    @Input() monthTitles: string[];

    @Input() activeClass: string;

    @Input() toggleTarget: ToggleDirective;

    @ViewChild('pad') pad: ElementRef;

    year: number;

    month: number;

    day: number;

    show: boolean;

    toggleDom: HTMLElement;

    ticking = false;

    datepickerStyle = { top: '0', left: '0', display: 'none', position: 'absolute' };

    private value: string;

    autoHandle: () => void;

    applyChange = new Function();

    applyTounced = new Function();

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

    constructor(private html: HtmlDomService, private configService: ConfigService) {

        // labels
        this.weekTitles = configService.config.weekTitles;
        this.monthTitles = configService.config.monthTitles;

        // tody
        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();

        // active day
        this.setValue();

        this.color = this.configService.config.defaultColor;

        this.show = false;
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.autoHandle);
        window.removeEventListener('resize', this.autoHandle);
    }


    writeValue(value: any) {
        this.value = value;
        let date = new Date(this.value);
        if (!date.getFullYear()) {
            date = new Date();
        }
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.setValue();
    }

    registerOnChange(fn: any): void { this.applyChange = fn; }

    registerOnTouched(fn: any): void { this.applyTounced = fn; }

    getMonth(month: number): string {
        return this.monthTitles[month - 1];
    }

    setDay(day: number): void {
        if (day <= 0) { return; }
        this.day = day;
        this.setValue();
        this.applyChange(this.value);
        this.toggle();
    }

    setValue() {
        this.value = `${this.year}/${this.month}/${this.day}`;
    }

    isActiveDay(day: number): boolean {
        return this.value === `${this.year}/${this.month}/${day}`;
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

    toggle() {

        this.show = !this.show;

        if (this.show) {

            if (!this.value) {
                this.value = `${this.year}/${this.month}/${this.day}`;
            } else {
                const date = this.value.split('/');
                this.year = parseInt(date[0], 10);
                this.month = parseInt(date[1], 10);
                this.day = parseInt(date[2], 10);
            }

            this.autoPosition();
        }
    }

    bind(toggleDirective: ToggleDirective) {
        this.toggleDom = toggleDirective.dom;
        this.autoHandle = () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    if (this.show) {
                        this.autoPosition();
                    }
                    this.ticking = false;
                });
            }
            this.ticking = true;
        };
        window.addEventListener('scroll', this.autoHandle, false);
        window.addEventListener('resize', this.autoHandle, false);
    }

    autoPosition() {
        setTimeout(() => {
            const padPositon = this.html.getPosition(this.pad.nativeElement);
            const position = this.html.getPosition(this.toggleDom);
            const height = this.html.getHeight(this.toggleDom);
            this.datepickerStyle.display = 'none';
            this.datepickerStyle.left = position.x - padPositon.x + 'px';
            this.datepickerStyle.top = height + position.y + 7.5 + 'px';
            let top = height + position.y + 7.5 + 380;
            if (window.innerHeight < top) {
                top = window.innerHeight - 380 - 7.5;
            } else {
                top = position.y + height + 7.5;
            }
            this.datepickerStyle.top = top - padPositon.y + 'px';
            this.datepickerStyle.display = '';
        });
    }

    tryClose($event: any) {
        if ($event.target === this.pad.nativeElement) {
            this.toggle();
        }
    }

    trackByFn(item: any): number {
        return item.length;
    }
}
