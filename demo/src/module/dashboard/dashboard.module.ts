import { NgModule } from '@angular/core';
import { ButtonModule, ChartModule, CheckboxModule, MenuModule, OffCanvasModule, TabModule, TUIExtModule } from 'ng-tui';
import { DashboardRoutingModule } from './dashboard.routing';
import { HomePageComponent } from './page/home/home.page';
import { MenuComponent } from './view/menu/menu.component';
import { MsgComponent } from './view/navbar/msg';
import { NavbarComponent } from './view/navbar/navbar.component';
import { SideComponent } from './view/navbar/side';

@NgModule({
  imports: [
    TUIExtModule,
    ButtonModule,
    CheckboxModule,
    TabModule,
    MenuModule,
    ChartModule,
    OffCanvasModule,
    DashboardRoutingModule,
  ],
  declarations: [NavbarComponent, SideComponent, MsgComponent, MenuComponent, HomePageComponent],
  exports: [NavbarComponent, MenuComponent],
})
export class DashboardModule { }
