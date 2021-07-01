import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-year',
    templateUrl: './year.html',
})
export class YearComponent extends ThemeDirective implements OnChanges {
    yearList: Array<number[]> = [];
    focusYear: number;

    @Input() activeYear: number;
    @Output() yearChange = new EventEmitter<number>(false);

    constructor(public confiService: ConfigService) {
        super();
        this.activeYear = this.focusYear = new Date().getFullYear();
        this.updateYears();
        this.color = confiService.config.defaultColor;
    }

    ngOnChanges(): void {
        this.focusYear = this.activeYear;
        this.updateYears();
    }

    updateYears(): void {
        const years = [];
        const year = this.focusYear || new Date().getFullYear();
        for (let i = 0; i < 5; i++) {
            years.push(year - 5 + i);
        }
        years.push(year);
        for (let i = 0; i < 6; i++) {
            years.push(year + 1 + i);
        }
        console.log(this.yearList);
        this.yearList = [years.splice(0, 3), years.splice(0, 3), years.splice(0, 3)];
    }

    setActiveYear(year: number): void {
        this.activeYear = year;
        this.yearChange.emit(this.activeYear);
    }

    cleanValue(): void {
        this.setActiveYear(0);
    }

    setNow(): void {
        this.setActiveYear(new Date().getFullYear());
        this.focusYear = this.activeYear;
        this.updateYears();
    }

    prevYear(): void {
        this.focusYear -= 10;
        this.updateYears();
    }

    nextYear(): void {
        this.focusYear += 10;
        this.updateYears();
    }
}
