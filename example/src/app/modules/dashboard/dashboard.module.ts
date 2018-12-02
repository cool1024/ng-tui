/**
 * 模版模块（项目基础模版模块）
 *
 * @author cool1025
 * @file   dashboard.module.ts
 * @date   2018-8-1 15:23:36
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule, declarationComponents, entryComponents, providers, exportComponents } from './dashboard.routing';
import { ButtonModule, TabModule, EChartModule, DropdownModule } from 'ng-tui';

@NgModule({
    imports: [
        FormsModule,
        EChartModule,
        TabModule,
        ButtonModule,
        DropdownModule,
        DashboardRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    exports: [exportComponents],
    providers: [providers]
})
export class DashboardModule { }
