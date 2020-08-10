/**
 * Demo Module
 *
 * @author cool1024
 * @file   data.module.ts
 * @date   2020-8-10 14:33:30
 */
import { NgModule } from '@angular/core';
import { declarationComponents, entryComponents, DataRoutingModule } from './data.routing';
import { } from 'projects/ng-tui/src/public_api';

@NgModule({
    imports: [
        DataRoutingModule
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class DataModule { }
