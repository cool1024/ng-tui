/**
 * 模版模块（项目基础模版模块）
 *
 * @author cool1025
 * @file   dashboard.module.ts
 * @date   2018-8-1 15:23:36
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule, declarationComponents, entryComponents, providers } from './dashboard.routing';
import { EChartModule } from '../../tools-ui/lib/echart/echart.module';
import { TabModule } from '../../tools-ui/modules/tab/tab.module';

@NgModule({
    imports: [
        FormsModule,
        EChartModule,
        TabModule,
        DashboardRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [providers]
})
export class DashboardModule { }
