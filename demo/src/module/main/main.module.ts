import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { ButtonModule, TUIModule } from 'ng-tui';
import { MainRoutingModule } from './main.routing';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    BrowserModule,
    MainRoutingModule,
    DashboardModule,
    TUIModule.forRoot(),
    ButtonModule,
  ],
  providers: [],
  bootstrap: [MainComponent],
})
export class MainModule {}
