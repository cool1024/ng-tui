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
    ImageModule,
    SelectModule,
    ConfirmModule,
    ToastModule,
    TabModule,
    TooltipsModule,
    DropdownModule,
    CollapseModule,
    PaginationModule,
    PrismModule,
    ProgressModule,
    ModalModule,
    CheckboxModule,
    DatepickerModule,
    TableModule,
    MapModule,
    ChartModule,
    OffCanvasModule,
    TimelineModule,
    CkeditorModule,
    RibbonsModule,
} from 'ng-tui';

@NgModule({
    imports: [
        ButtonModule,
        DropdownModule,
        ProgressModule,
        PaginationModule,
        ImageModule,
        TabModule,
        CollapseModule,
        OffCanvasModule,
        TimelineModule,
        ToastModule,
        ConfirmModule,
        ModalModule,
        SelectModule,
        CheckboxModule,
        TooltipsModule,
        TableModule,
        PrismModule,
        DatepickerModule,
        MapModule,
        ChartModule,
        CkeditorModule,
        RibbonsModule,
        DemoRoutingModule,
    ],
    declarations: [declarationComponents],
})
export class DemoModule { }
