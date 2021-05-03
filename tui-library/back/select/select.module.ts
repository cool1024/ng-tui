import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '../dropdown/dropdown.module';
import { SelectComponent } from './select.component';
import { SelectsComponent } from './selects.component';
import { SelectBlockComponent } from './select-block.component';

@NgModule({
    imports: [
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        SelectComponent,
        SelectsComponent,
        SelectBlockComponent,
    ],
    exports: [
        FormsModule,
        SelectComponent,
        SelectsComponent,
        SelectBlockComponent,
    ]
})
export class SelectModule { }
