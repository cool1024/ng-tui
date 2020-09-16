import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ButtonModule } from '../button/button.module';
import { YearComponent } from './year.component';
import { DateComponent } from './date.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { DateRangeComponent } from './date-range.component';
import { DatepickerComponent } from './datepicker.component';
import { YearpickerComponent } from './yearpicker.component';
import { TimeComponent } from './time';
import { TimepickerComponent } from './timepicker.component';
import { DatepickersComponent } from './date-range-picker.component';
import { DateRangePipe } from './date-range.pipe';

@NgModule({
    imports: [
        ButtonModule,
        TUICoreModule,
        DropdownModule
    ],
    declarations: [
        YearComponent,
        DateComponent,
        TimeComponent,
        DateRangeComponent,
        DatepickerComponent,
        YearpickerComponent,
        TimepickerComponent,
        DatepickersComponent,
        DateRangePipe
    ],
    exports: [
        TUICoreModule,
        ButtonModule,
        DropdownModule,
        YearComponent,
        DateComponent,
        TimeComponent,
        DateRangeComponent,
        DatepickerComponent,
        YearpickerComponent,
        TimepickerComponent,
        DatepickersComponent,
        DateRangePipe
    ]
})
export class DatepickerModule { }
