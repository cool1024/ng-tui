/**
 * 测试模块路由
 *
 * @author cool1024
 * @file   server-test.routing.ts
 * @date   2018-12-14 14:42:14
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * 相关服务
 */
import { ServerTestService } from './services/server-test.service';

/**
 * 页面/其它组件
 */
import { MysqlTestComponent } from './pages/mysql-test/mysql-test.component';
import { WriteTestModalComponent } from './pages/mysql-test/write-test-modal.component';
import { MysqlBaseTestComponent } from './components/mysql-base-test/mysql-base-test.component';
import { ChartAnalyseComponent } from './pages/chart-analyse/chart-analyse.component';
import { LineChartComponent } from './pages/chart-analyse/line-chart.component';
import { ChartDataModalComponent } from './pages/chart-analyse/chart-data.modal';
import { ApiTestComponent } from './pages/api-test/api-test.component';
import { ApiChartComponent } from './pages/api-test/api-chart.component';
import { ApiHeaderComponent } from './pages/api-test/api-header.component';
import { ApiAddComponent } from './pages/api-test/api-add.component';

const routes: Routes = [
    { path: 'mysql-test', component: MysqlTestComponent, },
    { path: 'chart-analyse', component: ChartAnalyseComponent, data: { breadcrumbs: [{ title: '图表分析' }] } },
    { path: 'api-test', component: ApiTestComponent, data: { breadcrumbs: [{ title: '接口测试' }] } },
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    MysqlTestComponent,
    WriteTestModalComponent,
    MysqlBaseTestComponent,
    ChartAnalyseComponent,
    LineChartComponent,
    ChartDataModalComponent,
    ApiTestComponent,
    ApiChartComponent,
    ApiHeaderComponent,
    ApiAddComponent,
];

/**
 * 动态组件（模态框，窗口）
 */

export const entryComponents = [
    WriteTestModalComponent,
    LineChartComponent,
    ChartDataModalComponent,
    ApiHeaderComponent,
    ApiAddComponent,
];

/**
 * 服务列表
 */
export const providers = [
    ServerTestService
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServerTestRoutingModule { }
