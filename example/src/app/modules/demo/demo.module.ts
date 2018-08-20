/**
 * 第三方示例模块
 *
 * @author xiaojian
 * @file   demo.module.ts
 * @date   2018-8-19 17:11:38
 */
import { NgModule } from '@angular/core';
import { DemoRoutingModule, declarationComponents, entryComponents, providers } from './demo.routing';
import { ShareModule } from '../../cores/share.module';

@NgModule({
    imports: [
        ShareModule,
        DemoRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [providers]
})
export class DemoModule { }
