/**
 * Dashboard Module
 *
 * @author cool1024
 * @file   dashboard.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { ButtonModule, SelectModule, ChartModule, CollapseModule, TabModule, DropdownModule } from '../../../../projects/ng-tui/src/public_api';
import { DashboardRoutingModule, declarationComponents, entryComponents } from './dashboard.routing';
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
        DashboardRoutingModule
    ],
    exports: [
        LoginComponent,
        NavbarComponent,
        MenuComponent,
    ],
    providers: [DashbardService],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class DashboardModule { }
