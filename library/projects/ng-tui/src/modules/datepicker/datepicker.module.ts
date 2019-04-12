import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ButtonModule } from '../button/button.module';
import { YearComponent } from './year.component';
import { DateComponent } from './date.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { DateRangeComponent } from './date-range.component';

@NgModule({
    imports: [
        ButtonModule,
        TUICoreModule,
        DropdownModule
    ],
    declarations: [
        YearComponent,
        DateComponent,
        DateRangeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [
        TUICoreModule,
        ButtonModule,
        DropdownModule,
        YearComponent,
        DateComponent,
        DateRangeComponent,
    ]
})
export class DatepickerModule { }
