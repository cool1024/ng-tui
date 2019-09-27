import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
    TUIModule,
    DatepickerModule,
    CheckboxModule,
    PaginationModule,
    IconfontModule,
    CssloadModule,
    TooltipsModule,
    SelectModule,
    ModalModule,
    ConfirmModule,
} from '../../projects/ng-tui/src/public_api';
import { FlashComponent } from './demo/flash.component';
import { ExampleModalComponent } from './demo/example-modal.component';
import { UploadModule } from 'projects/ng-tui/src/modules/upload/upload.module';

@NgModule({
    declarations: [
        AppComponent,
        FlashComponent,
        ExampleModalComponent,
    ],
    entryComponents: [
        FlashComponent,
        ExampleModalComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot({
            confirmCancelTitle: '取消',
            confirmOkTitle: '确认',
            paginationItems: [{ text: '显示 5 条', value: 5 }, { text: '显示 10 条', value: 10 }, { text: '显示 20 条', value: 20 }]
        }),
        ConfirmModule,
        IconfontModule,
        DatepickerModule,
        CheckboxModule,
        PaginationModule,
        TooltipsModule,
        CssloadModule,
        SelectModule,
        ModalModule,
        UploadModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
