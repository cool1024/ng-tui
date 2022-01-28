import { Component } from '@angular/core';
import { ModalService } from 'projects/ng-tui/src/modules/modal/modal.service';
import {
  ConfirmService,
  DropMenuItem,
  Item,
  ItemTree,
  Menu,
  MenuService,
  OffcanvasService,
  Pagination,
  ToastService,
  ViewService,
} from 'projects/ng-tui/src/public-api';
import { requestObject } from 'projects/ng-tui/src/tui-core/pipes/request';
import { Modal } from './modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  page = new Pagination(100);
  data = '';
  options: Item[] = [
    { text: '1111', value: '2222' },
    { text: '222', value: '11' },
  ];
  blockOptions: ItemTree[] = [
    {
      value: 1,
      text: 'A',
      children: [
        { value: 2, text: 'A-A' },
        { value: 3, text: 'A-B' },
        {
          value: 4,
          text: 'A-C',
          children: [
            { value: 5, text: 'A-C-A' },
            { value: 6, text: 'A-C-B' },
            { value: 7, text: 'A-C-C' },
          ],
        },
      ],
    },
    {
      value: 8,
      text: 'B',
      children: [
        { value: 9, text: 'B-A' },
        { value: 10, text: 'B-B' },
      ],
    },
    {
      value: 11,
      text: 'C',
    },
  ];
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

  value: any;

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
    private offcanvas: OffcanvasService,
    private menu: MenuService,
    private view: ViewService,
  ) {
    requestObject('assets/menu.json').subscribe((obj) => {
      this.items = obj;
      // console.log(this.items);
    });
  }

  showModal(toggle: any): void {
    this.view.create(toggle, Modal, { position: 'auto', offsetX: 0, offsetY: 0, zIndex: 1, fitWidth: false }).present();
    //this.offcanvas.create(Modal, { title: '111111', position: 'top' }).present();
    // this.menu.showMenu(toggle, ['11111', '22222']);
    // this.toast.success('11111', 'w222222', -1);
    // this.confirm.success('11111', '1111122222').subscribe();
  }

  handleClick(node: Node) {
    console.log(node);
  }
}
