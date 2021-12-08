import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenusComponent } from './menus.component';

@Component({
  selector: 'ts-menus-mini',
  templateUrl: './menus-mini.html',
  exportAs: 'tsMenusMini',
})
export class MenusMiniComponent extends MenusComponent {
  constructor(public sanitizer: DomSanitizer) {
    super();
  }
}
