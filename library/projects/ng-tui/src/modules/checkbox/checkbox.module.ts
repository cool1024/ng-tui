import { NgModule } from '@angular/core';
import { RadioComponent } from './radio.component';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CheckboxComponent } from './checkbox.component';
import { SwitchComponent } from './switch.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        RadioComponent,
        CheckboxComponent,
        SwitchComponent,
    ],
    exports: [
        RadioComponent,
        CheckboxComponent,
        SwitchComponent,
    ]
})
export class CheckboxModule { }
