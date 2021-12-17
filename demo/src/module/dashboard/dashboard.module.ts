import { NgModule } from '@angular/core';
import { MenuModule } from 'ng-tui';
import { DashboardRoutingModule } from './dashboard.routing';
import { MenuComponent } from './view/menu/menu.component';
import { NavbarComponent } from './view/navbar/navbar.component';

@NgModule({
  imports: [MenuModule, DashboardRoutingModule],
  declarations: [NavbarComponent, MenuComponent],
  exports: [NavbarComponent, MenuComponent],
})
export class DashboardModule {}
