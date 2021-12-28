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
      console.log(this.items);
    });
  }

  handleClick(node: Node): void {
    const menu: any = node.value;
    this.router.navigateByUrl(menu.route);
  }
}
