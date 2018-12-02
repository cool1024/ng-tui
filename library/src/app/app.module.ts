import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TUIModule, SelectModule, CssloadModule, DatePickerModule, ButtonModule, DropdownModule } from '../../projects/ng-tui/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TUIModule.forRoot(),
    SelectModule,
    CssloadModule,
    DatePickerModule,
    DropdownModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
