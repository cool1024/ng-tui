import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  // Home Route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Child Module
  { path: 'demo', loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule) },
  // { path: 'data', loadChildren: () => import('./modules/data/data.module').then(m => m.DataModule) },
  // { path: 'viewer', loadChildren: () => import('./modules/viewer/viewer.module').then(m => m.ViewerModule) },

  // Default Route
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
