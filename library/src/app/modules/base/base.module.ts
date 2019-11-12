/**
 * Base Module
 *
 * @author cool1024
 * @file   base.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { declarationComponents, entryComponents, BaseRoutingModule } from './base.routing';
import { ButtonModule, PrismModule, TableModule, CheckboxModule } from 'projects/ng-tui/src/public_api';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ButtonModule,
        PrismModule,
        TableModule,
        CheckboxModule,
        FormsModule,
        BaseRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class BaseModule { }
