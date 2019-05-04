import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TUIModule, DropdownModule, IconfontModule, ToastModule } from 'ng-tui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './cores/core.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        TUIModule.forRoot({
            defaultColor: 'info',
            confirmCancelTitle: '取消',
            confirmOkTitle: '确认',
            weekTitles: ['一', '二', '三', '四', '五', '六', '日'],
            monthTitles: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            paginationItems: [{ text: '显示 5 条', value: 5 }, { text: '显示 10 条', value: 10 }, { text: '显示 20 条', value: 20 }]
        }),
        ToastModule.forRoot({ position: 'bottom right', timeout: 3000, maxLength: 6 }),
        DropdownModule,
        IconfontModule,
        CoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }