import { NgModule } from '@angular/core';
import { TableHeaderComponent, TableComponent } from './table';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CssloadModule } from '../cssload/cssload.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
    imports: [TUICoreModule, PaginationModule, CssloadModule, DropdownModule],
    declarations: [TableHeaderComponent, TableComponent],
    exports: [PaginationModule, CssloadModule, DropdownModule, TableHeaderComponent, TableComponent],
})
export class TableModule {}
