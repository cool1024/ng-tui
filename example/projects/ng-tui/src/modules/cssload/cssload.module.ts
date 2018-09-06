import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TableLoadComponent } from './table-load.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        TableLoadComponent
    ],
    exports: [
        TableLoadComponent,
    ]
})
export class CssloadModule { }
