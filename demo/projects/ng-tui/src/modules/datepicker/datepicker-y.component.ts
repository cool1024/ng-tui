import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from './base.class';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-datepicker-y',
    template: `
    <div [ngClass]="{'d-none':!show}" #pad class="fixed-top h-100 w-100" (click)="tryClose($event)">
        <div class="card rounded-0 border-0 ts-box" [ngStyle]="datepickerStyle">
            <div class="card-body">
                <div class="d-flex justify-content-center flex-wrap">
                    <div *ngFor="let year of yearList"
                        (click)="setValue(year)"
                        style="width:80px;line-height:40px"
                        class="d-block text-center p-2 text-{{color}}-hover pointer {{value==year&&'text-'+color}}">
                        {{year}}</div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <button (click)="prevYear()" tsBtn sm class="mr-1">
                            <i class="iconfont icon-preview"></i>
                        </button>
                        <button (click)="nextYear()" tsBtn sm>
                            <i class="iconfont icon-next"></i>
                        </button>
                    </div>
                    <div class="text-right">
                        <button (click)="cleanValue()" tsBtn sm class="mr-1">清空</button>
                        <button (click)="setNow()" [tsBtn]="color" sm>今年</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    exportAs: 'tsDatepickerY',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatepickerYComponent),
        multi: true
    }]
})
export class DatepickerYComponent extends Base {

    yearList: Array<number> = [];

    activeValue: number;

    constructor(html: HtmlDomService, configService: ConfigService) {
        super(html, configService.config);
        this.activeValue = new Date().getFullYear();
        Object.assign(this.datepickerStyle, { width: '280px' });
    }

    prevYear() {
        this.activeValue -= 10;
        this.updateYears();
    }

    nextYear() {
        this.activeValue += 10;
        this.updateYears();
    }

    updateYears() {
        const years = [];
        const year = this.activeValue as number;
        for (let i = 0; i < 5; i++) {
            years.push(year - 5 + i);
        }
        years.push(year);
        for (let i = 0; i < 6; i++) {
            years.push(year + 1 + i);
        }
        this.yearList = years;
    }

    writeValue(value: number) {
        // tslint:disable-next-line:no-unused-expression
        value && (this.activeValue = value);
        this.value = this.activeValue;
        this.updateYears();
    }

    setValue(year: number) {
        this.value = year;
        this.activeValue = year;
        this.toggle();
        this.applyChange(this.value);
    }

    setNow() {
        this.setValue(new Date().getFullYear());
        this.updateYears();
    }

    cleanValue() {
        this.applyChange(0);
        this.toggle();
    }
}
