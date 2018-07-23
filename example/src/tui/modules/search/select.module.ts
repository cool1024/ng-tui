import { NgModule } from '@angular/core';
import { DropdownModule } from './../dropdown/dropdown.module';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        SearchComponent,
    ],
    exports: [
        FormsModule,
        SearchComponent,
    ]
})
export class SearchModule { }
