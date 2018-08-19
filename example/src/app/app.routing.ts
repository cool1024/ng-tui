/**
 * App路由模块
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    // 此处设置网站首页
    { path: '', redirectTo: 'demo/tooltips', pathMatch: 'full' },

    // 懒加载子模块
    // { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
    { path: 'demo', loadChildren: './modules/demo/demo.module#DemoModule' }

    // 最后全局匹配其他链接
    // { path: '**', redirectTo: 'dashboard/error', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            useHash: false
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
