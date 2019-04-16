import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
    TUIModule,
    DatepickerModule,
    CheckboxModule,
    PaginationModule,
    IconfontModule,
    CssloadModule,
    TooltipsModule,
    SelectModule,
} from '../../projects/ng-tui/src/public_api';
import { FlashComponent } from './demo/flash.component';

@NgModule({
    declarations: [
        AppComponent,
        FlashComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot({
            paginationItems: [{ text: '显示 5 条', value: 5 }, { text: '显示 10 条', value: 10 }, { text: '显示 20 条', value: 20 }]
        }),
        IconfontModule,
        DatepickerModule,
        CheckboxModule,
        PaginationModule,
        TooltipsModule,
        CssloadModule,
        SelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
