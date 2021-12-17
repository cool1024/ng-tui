import { Component } from '@angular/core';
import { Menu, requestObject } from 'ng-tui';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  items: Menu[] = [];
  constructor() {
    requestObject('assets/menu.json').subscribe((obj) => {
      this.items = obj;
      console.log(this.items);
    });
  }
}
