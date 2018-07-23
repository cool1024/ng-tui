import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './base-services/config.service';
import { HtmlDomService } from './base-services/htmldom.service';
import { ToggleDirective } from './directives/toggle.directives';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ToggleDirective,
        CommonModule
    ],
    declarations: [
        ToggleDirective,
    ],
    providers: [
        ConfigService,
        HtmlDomService,
    ]
})
export class TUICoreModule { }
