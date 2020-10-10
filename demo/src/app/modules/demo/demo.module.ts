/**
 * Demo Module
 *
 * @author cool1024
 * @file   demo.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { declarationComponents, DemoRoutingModule } from './demo.routing';
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
    ProgressModule,
    MapModule, 
    ModalModule
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
        ProgressModule,
        MapModule,
        ModalModule,
        DemoRoutingModule
    ],
    declarations: [declarationComponents],
})
export class DemoModule { }
