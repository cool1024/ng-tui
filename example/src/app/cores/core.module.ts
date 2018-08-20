/**
 * 核心模块
 * @date 2018-08-01
 * @author cool1024
 * @file   core.module.ts
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GlobalService } from './services/global.service';
import { RequestService, MenuService } from './services';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [
        GlobalService,
        RequestService,
        MenuService,
    ]
})
export class CoreModule { }
