import { NgModule } from '@angular/core';
import { OffcanvasService } from './offcanvas.service';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { OffcanvasComponent } from './offcanvas.component';
@NgModule({
  imports: [TUICoreModule],
  declarations: [OffcanvasComponent],
  providers: [OffcanvasService],
  exports: [TUICoreModule],
})
export class OffCanvasModule {}
