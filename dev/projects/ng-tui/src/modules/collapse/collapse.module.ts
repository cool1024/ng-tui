import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CollapseDirective } from './collapse.directive';
import { CollapsesDirective } from './collapses.directive';

@NgModule({
  imports: [TUICoreModule],
  declarations: [CollapseDirective, CollapsesDirective],
  exports: [TUICoreModule, CollapseDirective, CollapsesDirective],
})
export class CollapseModule {}
