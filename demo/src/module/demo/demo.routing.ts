import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './base/button/button.component';
import { DropdownComponent } from './base/dropdown/dropdown.component';
import { PaginationComponent } from './base/pagination/pagination.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { CollapseComponent } from './layout/collapse/collapse.component';
import { SelectComponent } from './form/select/select.component';
import { ProgressComponent } from './base/progress/progress.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { PickerComponent } from './form/picker/picker.component';
import { MapComponent } from './lib/map/map.component';
import { TableComponent } from './data/table/table.component';
import { ChartComponent } from './lib/chart/chart.component';
import { MoreComponent } from './data/table/more/more.component';
import { ModalComponent, SimpleModal } from './layout/modal/modal.component';
import { OffcanvasComponent } from './layout/offcanvas/offcanvas.component';
import { CanvasComponent } from './layout/offcanvas/canvas';
import { TimelineComponent } from './layout/timeline/timeline.component';
import { CkeditorComponent } from './lib/ckeditor/ckeditor.component';
import { RibbonsComponent } from './layout/ribbons/ribbons.component';

export const declarationComponents = [
  // base
  ButtonComponent,
  DropdownComponent,
  PaginationComponent,
  ProgressComponent,

  // layout
  TabsComponent,
  TimelineComponent,
  CollapseComponent,
  RibbonsComponent,
  OffcanvasComponent,
  CanvasComponent,
  ModalComponent,
  SimpleModal,

  // form
  SelectComponent,
  CheckboxComponent,
  PickerComponent,

  // lib
  MapComponent,
  ChartComponent,
  CkeditorComponent,

  // data
  TableComponent,
  MoreComponent,
];

const routes = [
  { path: 'ButtonComponent', component: ButtonComponent },
  { path: 'DropdownComponent', component: DropdownComponent },
  { path: 'PaginationComponent', component: PaginationComponent },
  { path: 'ProgressComponent', component: ProgressComponent },
  { path: 'TabsComponent', component: TabsComponent },
  { path: 'CollapseComponent', component: CollapseComponent },
  { path: 'TimelineComponent', component: TimelineComponent },
  { path: 'RibbonsComponent', component: RibbonsComponent },
  { path: 'OffcanvasComponent', component: OffcanvasComponent },
  { path: 'ModalComponent', component: ModalComponent },
  { path: 'SelectComponent', component: SelectComponent },
  { path: 'CheckboxComponent', component: CheckboxComponent },
  { path: 'PickerComponent', component: PickerComponent },
  { path: 'TableComponent', component: TableComponent },
  { path: 'MapComponent', component: MapComponent },
  { path: 'ChartComponent', component: ChartComponent },
  { path: 'CkeditorComponent', component: CkeditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule { }
