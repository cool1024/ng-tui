/**
 * 请编写模块文件说明
 *
 * @author 填写作者
 * @file   server-test.module.ts
 * @date   2018-12-14 14:42:14
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServerTestRoutingModule, declarationComponents, entryComponents, providers } from './server-test.routing';
import { ShareModule } from 'src/app/cores/share.module';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        ServerTestRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [providers]
})
export class ServerTestModule { }
