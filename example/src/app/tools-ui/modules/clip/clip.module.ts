import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipComponent } from './clip.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [
        ClipComponent
    ],
    entryComponents: [
        ClipComponent
    ]
})
export class ClipModule { }
