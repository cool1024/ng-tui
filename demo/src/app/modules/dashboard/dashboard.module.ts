import { NgModule } from '@angular/core';
import {
  ButtonModule,
  SelectModule,
  ChartModule,
  CollapseModule,
  TabModule,
  DropdownModule,
} from 'ng-tui';
import {
  DashboardRoutingModule,
  declarationComponents,
} from './dashboard.routing';
import { DashbardService } from './service/dashboard.service';
import { LoginComponent } from './view/login/login.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { MenuComponent } from './view/menu/menu.component';

@NgModule({
  imports: [
    CollapseModule,
    SelectModule,
    ButtonModule,
    DropdownModule,
    SelectModule,
    ChartModule,
    TabModule,
    DashboardRoutingModule,
  ],
  exports: [LoginComponent, NavbarComponent, MenuComponent],
  providers: [DashbardService],
  declarations: [declarationComponents],
})
export class DashboardModule {}
