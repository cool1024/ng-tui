import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TUIModule } from '../tui/tui.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './docs/button/button.component';
import { IconfontComponent } from './docs/iconfont/iconfont.component';
import { CheckboxComponent } from './docs/checkbox/checkbox.component';
import { DropdownComponent } from './docs/dropdown/dropdown.component';
import { PaginationComponent } from './docs/pagination/pagination.component';

@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        IconfontComponent,
        CheckboxComponent,
        DropdownComponent,
        PaginationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot({ iconfontType: 'font-class' }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
