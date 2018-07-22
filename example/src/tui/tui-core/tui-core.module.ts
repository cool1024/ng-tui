import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './base-services/config.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule
    ],
    providers: [
        ConfigService,
    ]
})
export class TUICoreModule { }
