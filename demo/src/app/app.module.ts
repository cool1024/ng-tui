import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TUIModule, TUIService, CssloadModule, TabModule, DropdownModule, CollapseModule, ChartModule, ToastModule, MapModule } from '../../projects/ng-tui/src/public_api';
import { ToolsUIConfig } from '../config/ui-config';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TUIModule.forRoot(ToolsUIConfig),
    ToastModule.forRoot(),
    ChartModule.forRoot(['https://gw.alipayobjects.com/os/lib/antv/g2/3.5.11/dist/g2.min.js']),
    MapModule.forRoot('bea16ad29a10b04e05e0624362d504dc'),
    CollapseModule,
    DropdownModule,
    CssloadModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [TUIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
