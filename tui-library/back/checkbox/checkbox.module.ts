import { NgModule } from '@angular/core';
import { RadioComponent } from './radio.component';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CheckboxComponent } from './checkbox.component';
import { SwitchComponent } from './switch.component';
import { SortComponent } from './sort.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        RadioComponent,
        CheckboxComponent,
        SwitchComponent,
        SortComponent
    ],
    exports: [
        RadioComponent,
        CheckboxComponent,
        SwitchComponent,
        SortComponent
    ]
})
export class CheckboxModule { }
