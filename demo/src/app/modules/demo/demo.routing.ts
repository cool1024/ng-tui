import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './base/button/button.component';
import { DropdownComponent } from './base/dropdown/dropdown.component';
import { PaginationComponent } from './base/pagination/pagination.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { CollapseComponent } from './layout/collapse/collapse.component';
import { SelectComponent } from './select/select.component';

export const declarationComponents = [
    ButtonComponent,
    DropdownComponent,
    PaginationComponent,
    TabsComponent,
    CollapseComponent,
    SelectComponent,
];

const routes = [
    { path: 'ButtonComponent', component: ButtonComponent },
    { path: 'DropdownComponent', component: DropdownComponent },
    { path: 'PaginationComponent', component: PaginationComponent },
    { path: 'TabsComponent', component: TabsComponent },
    { path: 'CollapseComponent', component: CollapseComponent },
    { path: 'SelectComponent', component: SelectComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoRoutingModule {}
