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
} from 'ng-tui';

@NgModule({
    imports: [
        ButtonModule,
        DropdownModule,
        ImageModule,
        TabModule,
        CollapseModule,
        ToastModule,
        ConfirmModule,
        SelectModule,
        TooltipsModule,
        PaginationModule,
        PrismModule,
        DemoRoutingModule,
    ],
    declarations: [declarationComponents],
})
export class DemoModule {}
