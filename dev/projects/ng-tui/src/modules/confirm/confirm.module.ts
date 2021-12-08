import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './confirm.service';
import { IconfontModule } from '../iconfont/iconfont.module';

@NgModule({
  imports: [TUICoreModule, IconfontModule],
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
  providers: [ConfirmService],
})
export class ConfirmModule {}
