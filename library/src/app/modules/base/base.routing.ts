/**
 * Base Routing
 *
 * @author cool1024
 * @file   base.routing.ts
 * @date   2019-10-17
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';

/**
 * 页面组件
 */


const routes: Routes = [
    { path: 'button', component: ButtonComponent },
    { path: 'table', component: TableComponent }
];

export const declarationComponents = [ButtonComponent, TableComponent];

export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaseRoutingModule { }
