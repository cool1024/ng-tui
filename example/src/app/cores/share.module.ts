/**
 * 共享模块
 * @date 2018-08-01
 * @author cool1024
 * @file   share.module.ts
 */

import { NgModule } from '@angular/core';
import {
    BadgeModule,
    ButtonModule,
    CheckboxModule,
    CollapseModule,
    ConfirmModule,
    CssloadModule,
    DropdownModule,
    IconfontModule,
    ImageModule,
    PaginationModule,
    ProgressModule,
    SearchModule,
    SelectModule,
    TabModule,
    TooltipsModule,
    ToastModule,
    PrismModule,
    UploadModule,
    ModalModule,
    WindowModule,
    ClipModule,
    MapModule,
    EChartModule,
} from '../tools-ui';
import { QuillModule } from '../tools-ui/lib/quill/quill.module';
import { DatePickerModule } from '../tools-ui/modules/datepicker/datepicker.module';

@NgModule({
    exports: [
        BadgeModule,
        ButtonModule,
        CheckboxModule,
        CollapseModule,
        ConfirmModule,
        CssloadModule,
        DropdownModule,
        IconfontModule,
        ImageModule,
        PaginationModule,
        ProgressModule,
        SearchModule,
        SelectModule,
        TabModule,
        TooltipsModule,
        PrismModule,
        ToastModule,
        UploadModule,
        ModalModule,
        WindowModule,
        ClipModule,
        QuillModule,
        MapModule,
        EChartModule,
        DatePickerModule,
    ]
})
export class ShareModule { }
