import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TUIModule, SelectModule, CssloadModule } from '../../projects/ng-tui/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TUIModule.forRoot(),
    SelectModule,
    CssloadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
