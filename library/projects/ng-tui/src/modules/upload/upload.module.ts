import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputFileDirective } from './input-file.directive';
import { ImageCardComponent } from './image-card.component';
import { ImageCardsComponent } from './image-cards.component';
import { InputVideoComponent } from './input-video.component';
import { FileUploadComponent } from './file-upload.component';
import { FileCardComponent } from './file-card.component';
import { FileCardsComponent } from './file-cards.component';

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
        FileUploadComponent,
        FileCardComponent,
        FileCardsComponent,
    ],
    exports: [
        FormsModule,
        CommonModule,
        InputFileDirective,
        ImageCardComponent,
        ImageCardsComponent,
        InputVideoComponent,
        FileUploadComponent,
        FileCardComponent,
        FileCardsComponent,
    ]
})
export class UploadModule { }
