import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './confirm.service';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        ConfirmComponent,
    ],
    exports: [
        ConfirmComponent,
    ],
    entryComponents: [
        ConfirmComponent,
    ],
    providers: [
        ConfirmService,
    ]
})
export class ConfirmModule { }
