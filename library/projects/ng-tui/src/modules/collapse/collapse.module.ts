import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CollapseDirective } from './collapse.directive';
import { CollapsesDirective } from './collapses.directive';
import { GroupComponent } from './group.comonent';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        TUICoreModule,
        RouterModule
    ],
    declarations: [
        CollapseDirective,
        CollapsesDirective,
        GroupComponent
    ],
    exports: [
        TUICoreModule,
        CollapseDirective,
        CollapsesDirective,
        GroupComponent
    ]
})
export class CollapseModule { }