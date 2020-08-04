/**
 * 请编写路由文件说明
 *
 * @author 填写作者
 * @file   app-storage.routing.ts
 * @date   2019-1-4 14:46:36
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * 页面组件
 */
import { AppMainComponent } from './pages/app-main/app-main.component';
import { AppDocsComponent } from './pages/app-docs/app-docs.component';
import { AppSettingComponent } from './pages/app-setting/app-setting.component';
import { AppServiceComponent } from './pages/app-service/app-service.component';
import { AppViewComponent } from './pages/app-view/app-view.component';

/**
 * 相关服务
 */
import { AppStorageService } from './services/app-storage.service';

const routes: Routes = [
    {
        path: 'app-main', component: AppMainComponent, children: [
            { path: 'app-docs', component: AppDocsComponent },
            { path: 'app-setting', component: AppSettingComponent },
            { path: 'app-service', component: AppServiceComponent },
            { path: 'app-view', component: AppViewComponent },
        ]
    },
];

/**
 * 指令、组件、管道声明
 */
export const declarationComponents = [
    AppMainComponent,
    AppDocsComponent,
    AppSettingComponent,
    AppServiceComponent,
    AppViewComponent,
];

/**
 * 动态组件（模态框，窗口）
 */

export const entryComponents = [];

/**
 * 服务列表
 */
export const providers = [
    AppStorageService
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppStorageRoutingModule { }
