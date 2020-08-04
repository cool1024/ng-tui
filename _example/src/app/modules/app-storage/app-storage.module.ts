/**
 * 请编写模块文件说明
 *
 * @author 填写作者
 * @file   app-storage.module.ts
 * @date   2019-1-4 14:46:36
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStorageRoutingModule, declarationComponents, entryComponents, providers } from './app-storage.routing';
import { ShareModule } from 'src/app/cores/share.module';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        AppStorageRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [providers]
})
export class AppStorageModule { }
