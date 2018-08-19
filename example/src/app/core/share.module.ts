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
} from '../tools-ui';

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
    ]
})
export class ShareModule { }
