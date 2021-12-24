import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Menu } from '../../tui-core/interface/item.interface';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'ts-menus',
  templateUrl: './menus.html',
  exportAs: 'tsMenus',
})
export class MenusComponent {
  @Input()
  items: Menu[];

  @ViewChildren(MenuComponent)
  menuViews!: QueryList<MenuComponent>;

  @Output()
  itemClick = new EventEmitter<Node>(true);

  handleClick(node: Node, keyIndex: number): void {
    this.menuViews.forEach((view, i) => {
      if (keyIndex !== i) {
        view.cleanAllActive();
      }
    });
    this.itemClick.emit(node);
  }
}
