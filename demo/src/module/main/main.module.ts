import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { MainComponent } from "./main.component";
import { ChartModule, MapModule, ToastModule, TUIModule } from "ng-tui";
import { MainRoutingModule } from "./main.routing";
import { DashboardModule } from "../dashboard/dashboard.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    BrowserModule,
    MainRoutingModule,
    DashboardModule,
    TUIModule.forRoot(),
    ToastModule.forRoot(),
    MapModule.forRoot("bea16ad29a10b04e05e0624362d504dc"),
    ChartModule.forRoot([
      "https://gw.alipayobjects.com/os/lib/antv/g2/3.5.11/dist/g2.min.js",
    ]),
  ],
  providers: [],
  bootstrap: [MainComponent],
})
export class MainModule {}
