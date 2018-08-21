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
import { PaginationComponent } from './pages/pagination/pagination.component';
import { ButtonComponent } from './pages/button/button.component';
import { CheckboxComponent } from './pages/checkbox/checkbox.component';
import { DropdownComponent } from './pages/dropdown/dropdown.component';
import { SelectComponent } from './pages/select/select.component';
import { TabComponent } from './pages/tab/tab.component';

const routes: Routes = [
    {
        path: 'tooltips', component: TooltipsComponent,
        data: {
            breadcrumbs: [{ title: '提示消息' }]
        }
    },
    {
        path: 'toast', component: ToastComponent,
        data: {
            breadcrumbs: [{ title: '通知消息' }]
        }
    },
    {
        path: 'pagination', component: PaginationComponent,
        data: {
            breadcrumbs: [{ title: '分页组件' }]
        }
    },
    {
        path: 'button', component: ButtonComponent,
        data: {
            breadcrumbs: [{ title: '按钮' }]
        }
    },
    {
        path: 'checkbox', component: CheckboxComponent,
        data: {
            breadcrumbs: [{ title: '选项' }]
        }
    },
    {
        path: 'dropdown', component: DropdownComponent,
        data: {
            breadcrumbs: [{ title: '下拉菜单' }]
        }
    },
    {
        path: 'select', component: SelectComponent,
        data: {
            breadcrumbs: [{ title: '下拉选择' }]
        }
    },
    {
        path: 'tab', component: TabComponent,
        data: {
            breadcrumbs: [{ title: '面板切换' }]
        }
    }
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    TooltipsComponent,
    ToastComponent,
    PaginationComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownComponent,
    SelectComponent,
    TabComponent,
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
