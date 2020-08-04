/**
 * 平台管理模块
 *
 * @author cool1024
 * @file   platform.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatformRoutingModule, declarationComponents, entryComponents, providers } from './platform.routing';
import { ShareModule } from 'src/app/cores/share.module';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        PlatformRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [providers]
})
export class PlatformModule { }
