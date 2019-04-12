import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    TUIModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    DatepickerModule,
} from '../../projects/ng-tui/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TUIModule.forRoot(),
        ToastModule.forRoot(),
        ButtonModule,
        DropdownModule,
        DatepickerModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
