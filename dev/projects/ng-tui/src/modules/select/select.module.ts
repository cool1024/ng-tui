import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '../dropdown/dropdown.module';
import { SelectComponent } from './select.component';
import { SelectsComponent } from './selects.component';
import { SelectBlockComponent } from './select-block.component';
import { ImageModule } from '../image/image.module';

@NgModule({
  imports: [DropdownModule, FormsModule, ImageModule],
  declarations: [SelectComponent, SelectsComponent, SelectBlockComponent],
  exports: [
    FormsModule,
    ImageModule,
    SelectComponent,
    SelectsComponent,
    SelectBlockComponent,
  ],
})
export class SelectModule {}
