import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './base-services/config.service';
import { HtmlDomService } from './base-services/htmldom.service';
import { ToggleDirective } from './directives/toggle.directives';
import { ComponentHandleService } from './component-creator/handle.service';
import { ComponentService } from './component-creator/component.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ToggleDirective,
        CommonModule,
    ],
    declarations: [
        ToggleDirective,
    ],
    providers: [
        ConfigService,
        HtmlDomService,
        ComponentService,
        ComponentHandleService,
    ]
})
export class TUICoreModule { }
