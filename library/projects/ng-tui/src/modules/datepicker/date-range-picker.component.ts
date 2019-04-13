import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateRange, DateObjRange } from './date-range.interface';
import { DateRangeComponent } from './date-range.component';

@Component({
    selector: 'ts-datepickers',
    exportAs: 'tsDatepickers',
    template: `
    <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
        <ng-content></ng-content>
    </div>
    <div #menuView="tsView"
        [ngStyle]="{zIndex:zIndex}"
        position="auto"
        tsView="fadeIn"
        class="bg-white shadow no-select p-3">
        <ts-date-range [activeDates]="activeDates" (dateChange)="sendChange($event)" [color]="color"></ts-date-range>
    </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatepickersComponent),
        multi: true
    }]
})
export class DatepickersComponent extends BaseForm {

    @Input() zIndex: number;
    @ViewChild(DateRangeComponent) dateRange: DateRangeComponent;

    activeDates = {
        start: null,
        end: null
    }

    constructor(cfs: ConfigService) {
        super()
        this.color = cfs.config.defaultColor;
        this.activeDates.start = this.getTimeObj('');
    }

    writeValue(value: DateRange) {
        if (value && value.start) {
            this.activeDates.start = this.getTimeObj(value.start);
        }
        if (value && value.start && value.end) {
            this.activeDates.end = this.getTimeObj(value.end);
        }
        if(this.dateRange){
            this.dateRange.updateRangeShow();
        }
    }

    getTimeObj(timeStr: string) {
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
            day: date.getDate()
        }
    }

    sendChange(value: DateObjRange) {
        console.log(value);
        const range: DateRange = {
            start: `${value.start.year}/${value.start.month}/${value.start.day}`,
            end: value.end ? `${value.end.year}/${value.end.month}/${value.end.day}` : ''
        }
        this.changeHandle(range);
    }
}
