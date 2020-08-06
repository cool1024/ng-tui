/**
 * 平台管理路由
 *
 * @author cool1024
 * @file   platform.routing.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * 页面组件
 */
import { CompanyTableComponent } from './pages/company-table/company-table.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';

/**
 * 相关服务
 */
import { PlatformService } from './services/platform.service';

const routes: Routes = [
    {
        path: 'company',
        component: CompanyTableComponent,
        data: { breadcrumbs: [{ title: '公司列表' }] },
        children: [
            {
                path: ':id', component: CompanyDetailComponent,
                data: { breadcrumbs: [{ title: '公司列表', path: '/platform/company' }, { title: '公司详情' }] }
            }
        ]
    }
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    CompanyTableComponent,
    CompanyDetailComponent,
];

/**
 * 动态组件（模态框，窗口）
 */

export const entryComponents = [];

/**
 * 服务列表
 */
export const providers = [
    PlatformService
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlatformRoutingModule { }
