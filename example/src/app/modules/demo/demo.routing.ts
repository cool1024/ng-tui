/**
 * 第三方示例模块路由
 *
 * @author xiaojian
 * @file   demo.routing.ts
 * @date   2018-8-19 17:11:38
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipsComponent } from './pages/tooltips/tooltips.component';
import { ToastComponent } from './pages/toast/toast.component';

const routes: Routes = [
    {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
            breadcrumbs: [
                {
                    title: '提示消息'
                }
            ]
        }
    },
    { path: 'toast', component: ToastComponent },
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    TooltipsComponent,
    ToastComponent,
];

/**
 * 动态组件（模态框，窗口）
 */
export const entryComponents = [];

/**
 * 服务列表
 */
export const providers = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
