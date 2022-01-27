/**
 * Demo Module
 *
 * @author cool1024
 * @file   demo.module.ts
 * @date   2019-1-4 09:22:58
 */
import { NgModule } from '@angular/core';
import { declarationComponents, SimpleRoutingModule } from './simple.routing';
import { ButtonModule, CheckboxModule } from 'ng-tui';

@NgModule({
    imports: [
        ButtonModule,
        CheckboxModule,
        SimpleRoutingModule,
    ],
    declarations: [declarationComponents],
})
export class SimpleModule { }
