/**
 * Demo Module
 *
 * @author cool1024
 * @file   viewer.module.ts
 * @date   2020-8-10 14:33:30
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { declarationComponents, providers, ViewerRoutingModule } from './viewer.routing';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ViewerRoutingModule
    ],
    declarations: [declarationComponents],
    providers: [providers]
})
export class ViewerModule { }
