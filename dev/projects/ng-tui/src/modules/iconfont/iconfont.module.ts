import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { IconfontDirective } from './iconfont.directive';

@NgModule({
  imports: [TUICoreModule],
  exports: [TUICoreModule, IconfontDirective],
  declarations: [IconfontDirective],
})
export class IconfontModule {}
