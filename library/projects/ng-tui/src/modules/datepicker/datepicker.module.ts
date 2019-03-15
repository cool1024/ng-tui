import { NgModule } from '@angular/core';
import { DatepickerComponent } from './/datepicker.component';
import { DropdownModule } from './../dropdown/dropdown.module';
import { ButtonModule } from './../button/button.module';
import { TimepickerComponent } from './timepicker.component';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { DatepickerYComponent } from './datepicker-y.component';

@NgModule({
    imports: [
        TUICoreModule,
        ButtonModule,
        DropdownModule,
    ],
    declarations: [
        DatepickerComponent,
        DatepickerYComponent,
        TimepickerComponent,
    ],
    exports: [
        TUICoreModule,
        DatepickerComponent,
        DatepickerYComponent,
        TimepickerComponent,
    ]
})
export class DatePickerModule { }
