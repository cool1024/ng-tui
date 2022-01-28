import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, Node, requestObject } from 'ng-tui';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  items: Menu[] = [];
  constructor(private router: Router) {
    requestObject('assets/menu.json').subscribe((obj) => {
      this.items = obj;
    });
  }

  handleClick(node: Node): void {
    const menu: any = node.value;
    if (menu.route) {
      this.router.navigateByUrl(menu.route);
    }
  }
}
