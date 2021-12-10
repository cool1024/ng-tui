import { NgModule, ModuleWithProviders } from '@angular/core';
import { DropdownModule } from '../dropdown/dropdown.module';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { ImageModule } from '../image/image.module';

@NgModule({
  imports: [DropdownModule, ImageModule, FormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent, ImageModule, DropdownModule],
})
export class PaginationModule {}
