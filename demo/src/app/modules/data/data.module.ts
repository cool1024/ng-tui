/**
 * Demo Module
 *
 * @author cool1024
 * @file   data.module.ts
 * @date   2020-8-10 14:33:30
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'projects/ng-tui/src/public_api';
import { declarationComponents, providers, DataRoutingModule } from './data.routing';
@NgModule({
    imports: [
        FormsModule,
        TableModule,
        DataRoutingModule
    ],
    declarations: [declarationComponents],
    providers: [providers]
})
export class DataModule { }
