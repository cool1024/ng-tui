import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '../dropdown/dropdown.module';
import { SelectComponent } from './select.component';
import { SelectsComponent } from './selects.component';

@NgModule({
    imports: [
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        SelectComponent,
        SelectsComponent,
    ],
    exports: [
        FormsModule,
        SelectComponent,
        SelectsComponent,
    ]
})
export class SelectModule { }
