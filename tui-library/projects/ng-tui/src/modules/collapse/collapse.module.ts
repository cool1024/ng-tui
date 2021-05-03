import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ItemsGroupComponent } from './items-group';
import { CollapseDirective } from './collapse.directive';
import { CollapsesDirective } from './collapses.directive';
import { GroupComponent } from './group.comonent';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    imports: [TUICoreModule, DropdownModule],
    declarations: [CollapseDirective, CollapsesDirective, GroupComponent, ItemsGroupComponent],
    exports: [TUICoreModule, CollapseDirective, CollapsesDirective, GroupComponent, ItemsGroupComponent],
})
export class CollapseModule {}
