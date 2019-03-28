import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    TUIModule,
    WindowModule,
    ClipModule,
    UploadModule,
    DatePickerModule,
    CkeditorModule,
    SelectModule,
    DropdownModule,
} from '../../projects/ng-tui/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TUIModule.forRoot(),
        CkeditorModule.forRoot(['assets/ckeditor/ckeditor-classic.js', 'assets/ckeditor/zh-cn.js']),
        WindowModule,
        UploadModule,
        DatePickerModule,
        ClipModule,
        SelectModule,
        DropdownModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
