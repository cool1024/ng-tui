/**
 * 第三方示例模块路由
 *
 * @author xiaojian
 * @file   demo.routing.ts
 * @date   2018-8-19 17:11:38
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './pages/button/button.component';
import { PaginationComponent } from './pages/pagination/pagination.component';
import { DropdownComponent } from './pages/dropdown/dropdown.component';
import { DatepickerComponent } from './pages/datepicker/datepicker.component';

const routes: Routes = [
    {
        path: 'button', component: ButtonComponent,
        data: { breadcrumbs: [{ title: '按钮' }] }
    },
    {
        path: 'pagination', component: PaginationComponent,
        data: { breadcrumbs: [{ title: '分页按钮' }] }
    },
    {
        path: 'dropdown', component: DropdownComponent,
        data: { breadcrumbs: [{ title: '下拉按钮' }] }
    },
    {
        path: 'datepicker', component: DatepickerComponent,
        data: { breadcrumbs: [{ title: '日期选择' }] }
    }
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    ButtonComponent,
    PaginationComponent,
    DropdownComponent,
    DatepickerComponent,
];

/**
 * 动态组件（模态框，窗口）
 */
export const entryComponents = [
];

/**
 * 服务列表
 */
export const providers = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
