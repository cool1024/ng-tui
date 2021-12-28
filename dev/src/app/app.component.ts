import { Component } from '@angular/core';
import { ModalService } from 'projects/ng-tui/src/modules/modal/modal.service';
import {
  ConfirmService,
  DropMenuItem,
  Item,
  Menu,
  MenuService,
  Pagination,
  ToastService,
} from 'projects/ng-tui/src/public-api';
import { ToggleDirective } from 'projects/ng-tui/src/tui-core/directive/toggle.directive';
import { requestObject } from 'projects/ng-tui/src/tui-core/pipes/request';
import { Modal } from './modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  page = new Pagination(100);
  data = '1111';
  options: Item[] = [{ text: '1111', value: '2222' }];
  items: Menu[] = [
    {
      text: '1',
      children: [
        { text: '1-1' },
        { text: '1-2' },
        { text: '1-3', children: [{ text: '1-3-1' }] },
        { text: '1-4' },
      ],
    },
    {
      text: '2',
      children: [
        { text: '2-1' },
        { text: '2-2', children: [{ text: '2-2-1' }] },
        { text: '2-3' },
        { text: '2-4' },
      ],
    },
  ];

  dropMenus: DropMenuItem[] = [
    DropMenuItem.title('个人信息'),
    DropMenuItem.split(),
    DropMenuItem.image('标题', 'assets/image/avatar/0.jpg', '', {
      width: 20,
      height: 20,
    }),
    DropMenuItem.item('手机号', ''),
    DropMenuItem.item('家庭住宅', ''),
  ];

  constructor(
    private modal: ModalService,
    private confirm: ConfirmService,
    private toast: ToastService,
    private menu: MenuService
  ) {
    requestObject('assets/menu.json').subscribe((obj) => {
      this.items = obj;
      // console.log(this.items);
    });
  }

  showModal(toggle: ToggleDirective): void {
    this.menu.showMenu(toggle, ['11111', '22222']);
    // this.toast.success('11111', 'w222222', -1);
    // this.confirm.success('11111', '1111122222').subscribe();
  }

  handleClick(node: Node) {
    console.log(node);
  }
}
