import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
    TUIModule,
    TUIService,
    CollapseModule,
    TabModule,
    CssloadModule,
    DropdownModule,
    ChartModule
} from '../../projects/ng-tui/src/public_api';
import { AppRoutingModule } from './app.routing';
import { ToolsUIConfig } from './config/tui-config';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        TUIModule.forRoot(ToolsUIConfig),
        ChartModule.forRoot(['https://gw.alipayobjects.com/os/lib/antv/g2/3.5.11/dist/g2.min.js']),
        CollapseModule,
        TabModule,
        DropdownModule,
        CssloadModule,
        DashboardModule,
        AppRoutingModule
    ],
    providers: [TUIService],
    bootstrap: [AppComponent]
})
export class AppModule { }
