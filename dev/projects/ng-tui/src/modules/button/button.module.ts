import { NgModule } from '@angular/core';
import { ButtonDirective } from './button.directive';
import { TUICoreModule } from '../../tui-core/tui-core.module';

@NgModule({
  imports: [TUICoreModule],
  declarations: [ButtonDirective],
  exports: [TUICoreModule, ButtonDirective],
})
export class ButtonModule {}
