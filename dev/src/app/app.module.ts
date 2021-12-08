import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TUIModule } from 'projects/ng-tui/src/tui.module';
import {
  ButtonModule,
  ConfirmModule,
  MenuModule,
  ModalModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
