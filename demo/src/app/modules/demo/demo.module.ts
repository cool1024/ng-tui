/**
 * Demo Module
 *
 * @author cool1024
 * @file   demo.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { declarationComponents, entryComponents, DemoRoutingModule } from './demo.routing';
import {
    ButtonModule,
    PrismModule,
    TableModule,
    ImageModule,
    CheckboxModule,
    DatepickerModule,
    SelectModule,
    ConfirmModule,
    ToastModule,
    TabModule,
    MapModule
} from 'projects/ng-tui/src/public_api';

@NgModule({
    imports: [
        ButtonModule,
        ToastModule,
        ConfirmModule,
        PrismModule,
        TableModule,
        CheckboxModule,
        ImageModule,
        DatepickerModule,
        SelectModule,
        TabModule,
        MapModule,
        DemoRoutingModule
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents]
})
export class DemoModule { }
