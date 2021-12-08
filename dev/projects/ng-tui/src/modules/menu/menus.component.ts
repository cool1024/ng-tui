import { Component, Input } from '@angular/core';
import { Menu, Node } from '../../tui-core/interface/item.interface';

@Component({
  selector: 'ts-menus',
  templateUrl: './menus.html',
  exportAs: 'tsMenus',
})
export class MenusComponent {
  @Input()
  items: Menu[];

  handleClick(keyIndex: number): void {
    this.items.forEach((item, i) => {
      if (keyIndex !== i) {
        this.cleanActive(item);
      }
    });
  }

  cleanActive(item: Menu): void {
    item.active = false;
    (item.children || []).forEach((e) => this.cleanActive(e));
  }
}
