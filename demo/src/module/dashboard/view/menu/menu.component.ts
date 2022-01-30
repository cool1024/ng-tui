import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, Node, requestObject, ValueService } from 'ng-tui';
import { DASHBOARD_CONFIG } from '../../dashboard.const';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  items: Menu[] = [];

  fullMode: boolean;

  constructor(private router: Router, private vs: ValueService) {
    requestObject('assets/menu.json').subscribe((obj) => {
      this.items = obj;
    });
    this.fullMode = this.vs.getValue(DASHBOARD_CONFIG.FULL_MENU, true);
  }

  handleClick(node: Node): void {
    const menu: any = node.value;
    if (menu.route) {
      this.router.navigateByUrl(menu.route);
    }
  }
}
