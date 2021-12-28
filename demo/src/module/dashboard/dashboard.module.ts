import { NgModule } from '@angular/core';
import { ButtonModule, ChartModule, MenuModule, TabModule } from 'ng-tui';
import { DashboardRoutingModule } from './dashboard.routing';
import { HomePageComponent } from './page/home/home.page';
import { MenuComponent } from './view/menu/menu.component';
import { NavbarComponent } from './view/navbar/navbar.component';

@NgModule({
  imports: [
    ButtonModule,
    TabModule,
    MenuModule,
    ChartModule,
    DashboardRoutingModule,
  ],
  declarations: [NavbarComponent, MenuComponent, HomePageComponent],
  exports: [NavbarComponent, MenuComponent],
})
export class DashboardModule {}
