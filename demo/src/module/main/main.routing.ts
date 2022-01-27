import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  // Home Route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'demo', loadChildren: () => import('../demo/demo.module').then(m => m.DemoModule) },
  { path: 'simple', loadChildren: () => import('../simple/simple.module').then(m => m.SimpleModule) },

  // Default Route
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
