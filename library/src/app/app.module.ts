import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    TUIModule,
    DatepickerModule,
} from '../../projects/ng-tui/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot(),
        DatepickerModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
