import { NgModule } from '@angular/core';
import { TableHeaderComponent } from './table';
import { TUICoreModule } from '../../tui-core/tui-core.module';

@NgModule({
    imports: [
        TUICoreModule
    ],
    declarations: [
        TableHeaderComponent
    ],
    exports: [
        TableHeaderComponent
    ]
})
export class TableModule { }
