import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TableLoadComponent } from './table-load.component';
import { AnimateDirective } from './animate.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        TableLoadComponent,
        AnimateDirective,
    ],
    exports: [
        TableLoadComponent,
        AnimateDirective,
    ]
})
export class CssloadModule { }
