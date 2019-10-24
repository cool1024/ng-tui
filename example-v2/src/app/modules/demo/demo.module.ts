/**
 * 组件示例模块
 *
 * @author xiaojian
 * @file   demo.module.ts
 * @date   2019年7月22日 13点37分
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
