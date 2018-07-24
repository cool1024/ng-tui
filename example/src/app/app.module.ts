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
import { ToastComponent } from './docs/toast/toast.component';
import { ProgressComponent } from './docs/progress/progress.component';
import { ImageComponent } from './docs/image/image.component';
import { LoadingComponent } from './docs/loading/loading.component';
import { SearchComponent } from './docs/search/search.component';

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
        BadgeComponent,
        ToastComponent,
        ProgressComponent,
        ImageComponent,
        LoadingComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot({ iconfontType: 'font-class', confirmCancelTitle: '取消', confirmOkTitle: '确认' }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
