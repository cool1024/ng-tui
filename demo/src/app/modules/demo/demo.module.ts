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
    ModalModule,
    TooltipsModule,
    DropdownModule
} from 'projects/ng-tui/src/public_api';

@NgModule({
    imports: [
        ButtonModule,
        DropdownModule,
        ProgressModule,
        ImageModule,

        ToastModule,
        ConfirmModule,
        PrismModule,
        TableModule,
        CheckboxModule,
    
        DatepickerModule,
        SelectModule,
        TabModule,
        MapModule,
        ModalModule,
        TooltipsModule,
        DemoRoutingModule
    ],
    declarations: [declarationComponents],
})
export class DemoModule { }
