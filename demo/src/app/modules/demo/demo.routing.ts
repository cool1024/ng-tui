/**
 * Demo Routing
 *
 * @author cool1024
 * @file   demo.routing.ts
 * @date   2020-10-09
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './base-component/button/button.component';
import { DropdownComponent } from './base-component/dropdown/dropdown.component';
import { PaginationComponent } from './base-component/pagination/pagination.component';
import { ProgressComponent } from './base-component/progress/progress.component';

import { TabsComponent } from './layout-view/tabs/tabs.component';
import { CollapseComponent } from './layout-view/collapse/collapse.component';

import { TableComponent } from './table/table.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { MapComponent } from './map/map.component';
import { PickerComponent } from './picker/picker.component';
import { ModalComponent, SimpleModal } from './layout-view/modal/modal.component';

export const declarationComponents = [
    ButtonComponent,
    DropdownComponent,
    PaginationComponent,
    ProgressComponent,

    TabsComponent,
    CollapseComponent,
    ModalComponent,
    SimpleModal,

    TableComponent,
    CheckboxComponent,
    SelectComponent,
    MapComponent,
    PickerComponent
];

const routes = declarationComponents.map(component => ({
    path: component.name, component
}));

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoRoutingModule { }
