import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TimelineComponent } from './timeline.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        TimelineComponent,
    ],
    exports: [
        TimelineComponent,
    ]
})
export class TimelineModule { }
