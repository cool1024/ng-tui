import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TUIModule } from 'projects/ng-tui/src/tui.module';
import {
  ButtonModule,
  CheckboxModule,
  ConfirmModule,
  DatepickerModule,
  DropdownModule,
  MenuModule,
  ModalModule,
  PaginationModule,
  SelectModule,
  TabModule,
  ToastModule,
  OffCanvasModule,
  TimelineModule,
  CkeditorModule,
  RibbonsModule,
} from 'projects/ng-tui/src/public-api';
import { Modal } from './modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, Modal],
  imports: [
    BrowserModule,
    TUIModule.forRoot(),
    ButtonModule,
    MenuModule,
    ModalModule,
    FormsModule,
    ConfirmModule,
    DropdownModule,
    PaginationModule,
    CheckboxModule,
    SelectModule,
    TabModule,
    DatepickerModule,
    OffCanvasModule,
    TimelineModule,
    CkeditorModule,
    RibbonsModule,
    ToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
