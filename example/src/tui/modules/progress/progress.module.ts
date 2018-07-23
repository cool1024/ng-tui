import { NgModule } from '@angular/core';
import { CommonModule } from './../../commons/common.module';
import { ProgressComponent } from './progress.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ProgressComponent,
    ],
    exports: [
        CommonModule,
        ProgressComponent,
    ]
})
export class ProgressModule { }
