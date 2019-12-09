/**
 * Demo Module
 *
 * @author cool1024
 * @file   demo.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import {
    declarationComponents,
    entryComponents,
    DemoRoutingModule
} from './demo.routing';
import {
    ButtonModule,
    PrismModule,
    TableModule,
    CheckboxModule,
    ImageModule,
    DatepickerModule
} from 'projects/ng-tui/src/public_api';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ButtonModule,
        PrismModule,
        TableModule,
        CheckboxModule,
        ImageModule,
        DatepickerModule,
        FormsModule,
        DemoRoutingModule
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class DemoModule { }
