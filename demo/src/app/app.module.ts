import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule, CssloadModule, MapModule, ToastModule, TUIModule, TUIService } from 'ng-tui';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ToolsUIConfig } from 'src/config/ui-config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        CssloadModule,
        TUIModule.forRoot(ToolsUIConfig),
        ToastModule.forRoot(),
        MapModule.forRoot('bea16ad29a10b04e05e0624362d504dc'),
        ChartModule.forRoot(['https://gw.alipayobjects.com/os/lib/antv/g2/3.5.11/dist/g2.min.js']),
    ],
    providers: [TUIService],
    bootstrap: [AppComponent],
})
export class AppModule {}
