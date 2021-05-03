import { NgModule } from '@angular/core';
import { TableHeaderComponent, TableComponent } from './table';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { PaginationModule } from '../pagination/pagination.module';
import { CssloadModule } from '../cssload/cssload.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { CheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
    imports: [
        TUICoreModule,
        PaginationModule,
        CssloadModule,
        DropdownModule,
        CheckboxModule
    ],
    declarations: [
        TableHeaderComponent,
        TableComponent
    ],
    exports: [
        PaginationModule,
        CssloadModule,
        DropdownModule,
        CheckboxModule,
        TableHeaderComponent,
        TableComponent
    ]
})
export class TableModule { }
