import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ProgressComponent } from './progress.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        ProgressComponent,
    ],
    exports: [
        ProgressComponent,
    ]
})
export class ProgressModule { }
