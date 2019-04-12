import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './base-services/config.service';
import { ToggleDirective } from './directives/toggle.directives';
import { ComponentHandleService } from './component-creator/handle.service';
import { ComponentService } from './component-creator/component.service';
import { ViewDirective } from './component-creator/view.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ToggleDirective,
        ViewDirective,
        CommonModule,
    ],
    declarations: [
        ToggleDirective,
        ViewDirective,
    ],
    providers: [
        ConfigService,
        ComponentService,
        ComponentHandleService,
    ]
})
export class TUICoreModule { }
