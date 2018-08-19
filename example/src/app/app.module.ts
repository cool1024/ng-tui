import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { TUIModule, DropdownModule } from './tools-ui';
import { AppComponent } from './app.component';
import { EChartModule } from './tools-ui/lib/echart/echart.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        TUIModule.forRoot(),
        EChartModule.forRoot('assets/echart/echarts.common.min.js'),
        DropdownModule,
        DashboardModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
