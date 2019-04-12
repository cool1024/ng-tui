import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-year',
    templateUrl: './year.html'
})
export class YearComponent extends BaseTheme implements OnChanges {

    yearList: Array<number[]> = [];
    focusYear: number;

    @Input()activeYear: number;
    @Output() yearChange = new EventEmitter<number>(false);

    constructor(confiService: ConfigService) {
        super();
        this.activeYear = this.focusYear = new Date().getFullYear();
        this.updateYears();
        this.color = confiService.config.defaultColor;
    }


    ngOnChanges(){
        this.focusYear = this.activeYear;
        this.updateYears();
    }

    updateYears() {
        const years = [];
        const year = this.focusYear;
        for (let i = 0; i < 5; i++) {
            years.push(year - 5 + i);
        }
        years.push(year);
        for (let i = 0; i < 6; i++) {
            years.push(year + 1 + i);
        }
        this.yearList = [];
        this.yearList.push(years.splice(0, 3));
        this.yearList.push(years.splice(0, 3));
        this.yearList.push(years.splice(0, 3));
        this.yearList.push(years.splice(0, 3));
    }

    setActiveYear(year: number) {
        this.activeYear = year;
        this.yearChange.emit(this.activeYear);
    }

    cleanValue() {
        this.setActiveYear(0);
    }

    setNow() {
        this.setActiveYear(new Date().getFullYear());
        this.focusYear = this.activeYear;
        this.updateYears();
    }

    prevYear() {
        this.focusYear -= 10;
        this.updateYears();
    }

    nextYear() {
        this.focusYear += 10;
        this.updateYears();
    }
}
