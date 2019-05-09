import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    TUIModule,
    ToastModule,
    ButtonModule,
    UploadModule,
} from '../../projects/ng-tui/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        UploadModule,
        TUIModule.forRoot(),
        ToastModule.forRoot(),
        ButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
