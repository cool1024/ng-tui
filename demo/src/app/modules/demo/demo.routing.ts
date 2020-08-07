/**
 * Demo Routing
 *
 * @author cool1024
 * @file   base.routing.ts
 * @date   2019-10-17
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { MapComponent } from './map/map.component';

export const declarationComponents = [
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    CheckboxComponent,
    SelectComponent,
    MapComponent
];

export const entryComponents = [];

const routes = declarationComponents.map(component => ({
    path: component.name, component
}));

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
