import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
    TUIModule,
} from '../../projects/ng-tui/src/public_api';
import { AppRoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot({
            confirmCancelTitle: '取消',
            confirmOkTitle: '确认',
            paginationItems: [{ text: '显示 5 条', value: 5 }, { text: '显示 10 条', value: 10 }, { text: '显示 20 条', value: 20 }]
        }),
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
