import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './cores/core.module';
import { SortablejsModule } from 'angular-sortablejs';
import { TUIModule, EChartModule, ToastModule, DropdownModule, MapModule } from './tools-ui';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { QuillModule } from './tools-ui/lib/quill/quill.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SortablejsModule.forRoot({ animation: 150 }),
        TUIModule.forRoot({
            confirmCancelTitle: '取消',
            confirmOkTitle: '确认',
        }),
        ToastModule.forRoot({ position: 'bottom right', timeout: 3000, maxLength: 6 }),
        EChartModule.forRoot('assets/echart/echarts.common.min.js'),
        QuillModule.forRoot(['assets/quill/quill.min.js']),
        MapModule.forRoot('bea16ad29a10b04e05e0624362d504dc'),
        DropdownModule,
        DashboardModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
