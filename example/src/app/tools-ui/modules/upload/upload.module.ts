import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputFileDirective } from './input-file.directive';
import { ImageCardComponent } from './image-card.component';
import { ImageCardsComponent } from './image-cards.component';
import { InputVideoComponent } from './input-video.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        InputFileDirective,
        ImageCardComponent,
        ImageCardsComponent,
        InputVideoComponent,
    ],
    exports: [
        FormsModule,
        CommonModule,
        InputFileDirective,
        ImageCardComponent,
        ImageCardsComponent,
        InputVideoComponent,
    ]
})
export class UploadModule { }
