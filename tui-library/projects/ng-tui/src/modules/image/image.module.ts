import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ImageDirective } from './image.directive';

@NgModule({
    imports: [TUICoreModule],
    declarations: [ImageDirective],
    exports: [ImageDirective],
})
export class ImageModule {}
