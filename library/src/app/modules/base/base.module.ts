/**
 * Base Module
 *
 * @author cool1024
 * @file   base.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { declarationComponents, entryComponents, BaseRoutingModule } from './base.routing';
import { ButtonModule, PrismModule } from 'projects/ng-tui/src/public_api';

@NgModule({
    imports: [
        ButtonModule,
        PrismModule,
        BaseRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class BaseModule { }
