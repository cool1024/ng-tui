import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '../dropdown/dropdown.module';
import { SelectComponent } from './select.component';
import { SelectBlockComponent } from './select-block.component';

@NgModule({
    imports: [
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        SelectComponent,
        SelectBlockComponent,
    ],
    exports: [
        FormsModule,
        SelectComponent,
        SelectBlockComponent,
    ]
})
export class SelectModule { }
