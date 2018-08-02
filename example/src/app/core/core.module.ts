/**
 * 核心模块
 * @date 2018-08-01
 * @author cool1024
 * @file   core.module.ts
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GlobalService } from './services/global.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
    ],
    exports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [
        GlobalService,
    ]
})
export class CoreModule { }
