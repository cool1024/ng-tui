import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { IconfontModule } from '../iconfont/iconfont.module';
import { RibbonsComponent } from './ribbons';

@NgModule({
    imports: [
        TUICoreModule,
        IconfontModule
    ],
    declarations: [
        RibbonsComponent,
    ],
    exports: [
        RibbonsComponent,
    ]
})
export class RibbonsModule { }
