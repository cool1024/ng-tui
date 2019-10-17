/**
 * Base Module
 *
 * @author cool1024
 * @file   base.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { declarationComponents, entryComponents, BaseRoutingModule } from './base.routing';
import { ButtonModule } from 'projects/ng-tui/src/public_api';

@NgModule({
    imports: [
        ButtonModule,
        BaseRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class BaseModule { }
