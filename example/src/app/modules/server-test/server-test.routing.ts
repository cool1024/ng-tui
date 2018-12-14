/**
 * 请编写路由文件说明
 *
 * @author 填写作者
 * @file   server-test.routing.ts
 * @date   2018-12-14 14:42:14
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * 页面组件
 */
import { MysqlTestComponent } from './pages/mysql-test/mysql-test.component';

/**
 * 相关服务
 */
import { ServerTestService } from './services/server-test.service';
import { WriteTestModalComponent } from './pages/mysql-test/write-test-modal.component';
import { MysqlBaseTestComponent } from './components/mysql-base-test/mysql-base-test.component';

const routes: Routes = [
    { path: 'mysql-test', component: MysqlTestComponent },
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    MysqlTestComponent,
    WriteTestModalComponent,
    MysqlBaseTestComponent,
];

/**
 * 动态组件（模态框，窗口）
 */

export const entryComponents = [
    WriteTestModalComponent,
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
