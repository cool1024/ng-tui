/**
 * Dashboard Routing
 *
 * @author cool1024
 * @file   dashboard.routing.ts
 * @date   2019-10-17
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { AdminComponent } from './page/admin/admin.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { MenuComponent } from './view/menu/menu.component';

// 模块路由配置
const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
];

export const declarationComponents = [
    LoginComponent,
    NavbarComponent,
    MenuComponent,
    HomeComponent,
    AdminComponent
];


export const entryComponents = [
    LoginComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
