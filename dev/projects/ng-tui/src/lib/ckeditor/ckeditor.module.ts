import { NgModule } from '@angular/core';
import { CkeditorDirective } from './ckeditor.directive';

@NgModule({
    declarations: [
        CkeditorDirective
    ],
    exports: [
        CkeditorDirective,
    ]
})
export class CkeditorModule { }