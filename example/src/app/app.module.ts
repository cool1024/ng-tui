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
import { SelectComponent } from './docs/select/select.component';
import { CollapseComponent } from './docs/collapse/collapse.component';
import { TabComponent } from './docs/tab/tab.component';
import { BadgeComponent } from './docs/badge/badge.component';

@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        IconfontComponent,
        CheckboxComponent,
        DropdownComponent,
        PaginationComponent,
        SelectComponent,
        CollapseComponent,
        TabComponent,
        BadgeComponent
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
