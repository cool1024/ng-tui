import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // 此处设置网站首页
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 懒加载子模块
  { path: 'demo', loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule) },

  // 最后全局匹配其他链接
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
