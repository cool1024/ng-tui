import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { TUICoreModule } from '../../tui-core/tui-core.module';
@NgModule({
  imports: [TUICoreModule],
  declarations: [ModalComponent],
  providers: [ModalService],
  exports: [TUICoreModule],
})
export class ModalModule {}
