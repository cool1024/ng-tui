import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueService } from './value/value.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [ValueService],
  exports: [CommonModule],
})
export class TUIExtModule { }
