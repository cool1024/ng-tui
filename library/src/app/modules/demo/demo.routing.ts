/**
 * Demo Routing
 *
 * @author cool1024
 * @file   base.routing.ts
 * @date   2019-10-17
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';

// 模块路由配置
const routes: Routes = [
    { path: 'button', component: ButtonComponent },
    { path: 'table', component: TableComponent },
    { path: 'pagination', component: PaginationComponent },
    { path: 'checkbox', component: CheckboxComponent },
    { path: 'select', component: SelectComponent },
];

export const declarationComponents = [
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    CheckboxComponent,
    SelectComponent
];


export const entryComponents = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
