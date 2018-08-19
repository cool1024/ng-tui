import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { TUIModule, EChartModule, ToastModule, DropdownModule, ConfirmModule } from './tools-ui';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        TUIModule.forRoot({
            confirmCancelTitle: '取消',
            confirmOkTitle: '确认',
        }),
        ToastModule.forRoot({ position: 'bottom right', timeout: 3000, maxLength: 6 }),
        EChartModule.forRoot('assets/echart/echarts.common.min.js'),
        DropdownModule,
        DashboardModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
