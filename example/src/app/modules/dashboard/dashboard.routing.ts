/**
 * 模版路由文件
 *
 * @author cool1024
 * @file   dashboard.routing.ts
 * @date   2018-8-1 15:23:36
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
];

/**
 * 导出组件列表
 */
export const exportComponents = [
    MenuComponent,
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    MenuItemsComponent,
    ...exportComponents,
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
export class DashboardRoutingModule { }
