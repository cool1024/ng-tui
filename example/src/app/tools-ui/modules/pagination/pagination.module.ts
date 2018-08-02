import { NgModule, ModuleWithProviders } from '@angular/core';
import { DropdownModule } from '../dropdown/dropdown.module';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        PaginationComponent,
    ],
    exports: [
        PaginationComponent,
    ]
})
export class PaginationModule {

}
