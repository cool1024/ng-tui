import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TableLoadComponent } from './table-load.component';
import { IconfontModule } from '../iconfont/iconfont.module';

@NgModule({
    imports: [
        TUICoreModule,
        IconfontModule
    ],
    declarations: [
        TableLoadComponent
    ],
    exports: [
        TableLoadComponent,
    ]
})
export class CssloadModule { }
