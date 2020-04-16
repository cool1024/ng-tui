/**
 * Dashboard Module
 *
 * @author cool1024
 * @file   dashboard.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, SelectModule, ChartModule } from 'projects/ng-tui/src/public_api';
import { DashboardRoutingModule, declarationComponents, entryComponents } from './dashboard.routing';
import { DashbardService } from './service/dashboard.service';
import { LoginComponent } from './view/login/login.component';
import { NavbarComponent } from './view/navbar/navbar.component';

@NgModule({
    imports: [
        FormsModule,
        ButtonModule,
        SelectModule,
        ChartModule,
        DashboardRoutingModule
    ],
    exports: [
        LoginComponent,
        NavbarComponent
    ],
    providers: [DashbardService],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class DashboardModule { }