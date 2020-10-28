import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ItemsGroupComponent } from './items-group';
import { CollapseDirective } from './collapse.directive';
import { CollapsesDirective } from './collapses.directive';
import { GroupComponent } from './group.comonent';

@NgModule({
    imports: [
        TUICoreModule
    ],
    declarations: [
        CollapseDirective,
        CollapsesDirective,
        GroupComponent,
        ItemsGroupComponent
    ],
    exports: [
        TUICoreModule,
        CollapseDirective,
        CollapsesDirective,
        GroupComponent,
        ItemsGroupComponent
    ]
})
export class CollapseModule { }