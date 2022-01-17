import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [TUICoreModule],
  declarations: [UploadComponent],
  exports: [TUICoreModule, UploadComponent],
})
export class UploadModule { }
