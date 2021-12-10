import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ImageDirective } from './image.directive';
import { SafeImageDirective } from './safe-image.directive';

@NgModule({
  imports: [TUICoreModule],
  declarations: [ImageDirective, SafeImageDirective],
  exports: [ImageDirective, SafeImageDirective],
})
export class ImageModule {}
