/**
 * 共享模块
 * @date 2018-08-01
 * @author cool1024
 * @file   share.module.ts
 */

import { NgModule } from '@angular/core';
import {
    ButtonModule,
    CheckboxModule,
    CssloadModule,
    DropdownModule,
    IconfontModule,
    PaginationModule,
    SelectModule,
    TooltipsModule,
    ToastModule,
    DatepickerModule,
} from 'ng-tui';

@NgModule({
    exports: [
        ButtonModule,
        CheckboxModule,
        CssloadModule,
        DropdownModule,
        IconfontModule,
        PaginationModule,
        SelectModule,
        TooltipsModule,
        ToastModule,
        DatepickerModule,
    ]
})
export class ShareModule { }
