import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Menu, Node } from '../../tui-core/interface/item.interface';
import { StatusText } from '../../tui-core/interface/status-value.interface';
import { Util } from '../../tui-core/util';
@Component({
  selector: 'ts-menu',
  templateUrl: './menu.html',
  exportAs: 'tsMenu',
})
export class MenuComponent {
  @Input()
  set items(items: Menu[]) {
    if (items) {
      this.menus = this.loadMenu(items);
    }
  }

  @Input()
  menus: Node[] = [];

  @Input()
  toggleClass: StatusText = {};

  @Input()
  targetClass: StatusText = {};

  @Input()
  offsetX = 0;

  @Input()
  increamentX = 0;

  @Input()
  isRoot = false;

  @Output()
  itemClick = new EventEmitter<Node>(true);

  get collapseItemStyle(): any {
    return {
      'padding-left': Util.getStylePx(this.offsetX),
    };
  }

  constructor(public sanitizer: DomSanitizer) {}

  private loadMenu(items: Menu[], parent?: Node): Node[] {
    return items.map<Node>((menu) => {
      const node: Node = {
        value: menu,
        parent,
        children: [],
        hasChild: menu.children && menu.children.length > 0 ? true : false,
      };
      node.children = this.loadMenu(menu.children || [], node);
      return node;
    });
  }

  cleanAllActive(): void {
    this.menus.forEach((menu) => this.cleanActive(menu));
  }

  cleanActive(item: Node): void {
    item.value.active = false;
    item.children.forEach((e) => this.cleanActive(e));
  }

  cleanParent(item: Node): void {
    if (item.parent && item.parent.parent && item.parent.parent.hasChild) {
      const parents = item.parent.parent.children;
      parents.forEach((e) => {
        if (e !== item.parent) {
          this.cleanActive(e);
        }
      });
    }
  }

  handleActive(item: Node, items: Node[]): void {
    // 同级别的其它节点和它们的子节点全部清空
    items.forEach((e) => {
      if (e !== item) {
        this.cleanActive(e);
      }
    });
    // 清空父级
    this.cleanParent(item);
    const menu = item.value as Menu;
    menu.active = true;
    this.itemClick.emit(item);
  }

  handleClick(item: Node): void {
    this.itemClick.emit(item);
  }
}
