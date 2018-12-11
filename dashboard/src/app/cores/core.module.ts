/**
 * 核心模块
 * @date 2018-08-01
 * @author cool1024
 * @file   core.module.ts
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GlobalService } from './services/global.service';
import { RequestService, MenuService, CryptService, AuthService, GuardService } from './services';
import { RequestInterceptor } from './services/request.interceptor';
import { ResponseInterceptor } from './services/response.interceptor';

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
        CryptService,
        AuthService,
        GuardService,
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    ]
})
export class CoreModule { }
