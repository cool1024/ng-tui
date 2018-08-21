import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputFileDirective } from './input-file.directive';
import { ImageCardComponent } from './image-card.component';
import { ImageCardsComponent } from './image-cards.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        InputFileDirective,
        ImageCardComponent,
        ImageCardsComponent,
    ],
    exports: [
        FormsModule,
        CommonModule,
        InputFileDirective,
        ImageCardComponent,
        ImageCardsComponent,
    ]
})
export class UploadModule { }
