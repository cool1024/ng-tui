/**
 * Dashboard Module
 *
 * @author cool1024
 * @file   dashboard.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './view/login/login.component';
import { ButtonModule } from 'projects/ng-tui/src/public_api';
import { DashboardRoutingModule, declarationComponents, entryComponents } from './dashboard.routing';

@NgModule({
    imports: [
        FormsModule,
        ButtonModule,
        DashboardRoutingModule
    ],
    exports: [LoginComponent],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class DashboardModule { }
