import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
    TUIModule,
    TUIService,
    CollapseModule,
    TabModule,
    CssloadModule,
    DropdownModule
} from '../../projects/ng-tui/src/public_api';
import { AppRoutingModule } from './app.routing';
import { ToolsUIConfig } from './config/tui-config';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        TUIModule.forRoot(ToolsUIConfig),
        CollapseModule,
        TabModule,
        DropdownModule,
        CssloadModule,
        DashboardModule,
        AppRoutingModule
    ],
    providers: [TUIService],
    bootstrap: [AppComponent]
})
export class AppModule { }
