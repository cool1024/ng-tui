import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TableLoadComponent } from './table-load.component';
import { AnimateDirective } from './animate.directive';
import { TableLoadDirective } from './table-load.directive';

@NgModule({
    imports: [TUICoreModule],
    declarations: [TableLoadComponent, TableLoadDirective, AnimateDirective],
    exports: [TableLoadComponent, TableLoadDirective, AnimateDirective],
})
export class CssloadModule {}
