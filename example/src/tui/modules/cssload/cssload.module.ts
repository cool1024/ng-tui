import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CssloadComponent } from './cssload.component';
import { TableLoadComponent } from './table-load.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        CssloadComponent,
        TableLoadComponent
    ],
    exports: [
        CssloadComponent,
        TableLoadComponent,
    ]
})
export class CssloadModule { }
