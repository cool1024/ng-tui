import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './cores/core.module';
import { SortablejsModule } from 'angular-sortablejs';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import {
    TUIModule,
    EChartModule,
    ToastModule,
    DropdownModule,
    MapModule,
    ButtonModule,
    ConfirmModule,
    QuillModule,
    CkeditorModule,
    ImageModule
} from 'ng-tui';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        SortablejsModule.forRoot({ animation: 150 }),
        TUIModule.forRoot({
            defaultColor: 'info',
            confirmCancelTitle: '取消',
            confirmOkTitle: '确认',
            weekTitles: ['一', '二', '三', '四', '五', '六', '日'],
            monthTitles: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            paginationItems: [{ text: '显示 5 条', value: 5 }, { text: '显示 10 条', value: 10 }, { text: '显示 20 条', value: 20 }]
        }),
        ConfirmModule,
        ImageModule,
        ToastModule.forRoot({ position: 'bottom right', timeout: 3000, maxLength: 6 }),
        EChartModule.forRoot('assets/echart/echarts.common.min.js'),
        QuillModule.forRoot(['assets/quill/quill.min.js']),
        MapModule.forRoot('bea16ad29a10b04e05e0624362d504dc'),
        CkeditorModule.forRoot(['assets/ckeditor/ckeditor-classic.js', 'assets/ckeditor/zh-cn.js']),
        // 使用Word样式支持，参考地址 https://ckeditor.com/ckeditor-5/#document
        // CkeditorModule.forRoot(['assets/ckeditor/ckeditor-document.js', 'assets/ckeditor/zh-cn-document.js']),
        ButtonModule,
        DropdownModule,
        DashboardModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
