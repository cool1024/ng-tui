import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipComponent } from './clip.component';
import { ButtonModule } from '../button/button.module';
import { DrawComponent } from './draw.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [
        ClipComponent,
        DrawComponent,
    ],
    entryComponents: [
        ClipComponent,
        DrawComponent,
    ]
})
export class ClipModule { }
