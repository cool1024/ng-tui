/**
 * Demo Routing
 *
 * @author cool1024
 * @file   demo.routing.ts
 * @date   2020-10-09
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { MapComponent } from './map/map.component';
import { PickerComponent } from './picker/picker.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProgressComponent } from './progress/progress.component';
import { ModalComponent } from './modal/modal.component';

export const declarationComponents = [
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    CheckboxComponent,
    SelectComponent,
    MapComponent,
    PickerComponent,
    TabsComponent,
    ModalComponent,
    ProgressComponent
];

const routes = declarationComponents.map(component => ({
    path: component.name, component
}));

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoRoutingModule { }
