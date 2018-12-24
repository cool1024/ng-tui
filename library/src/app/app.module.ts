import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    TUIModule,
    TabModule,
} from '../../projects/ng-tui/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TUIModule.forRoot(),
        // CkeditorModule.forRoot(['assets/ckeditor/ckeditor-classic.js', 'assets/ckeditor/zh-cn.js']),
        TabModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
