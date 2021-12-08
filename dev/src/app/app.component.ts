import { Component } from '@angular/core';
import { ModalService } from 'projects/ng-tui/src/modules/modal/modal.service';
import { ConfirmService, Menu } from 'projects/ng-tui/src/public-api';
import { requestObject } from 'projects/ng-tui/src/tui-core/pipes/request';
import { Modal } from './modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data = '1111';
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

  constructor(private modal: ModalService, private confirm: ConfirmService) {
    requestObject('assets/menu.json').subscribe((obj) => {
      this.items = obj;
      console.log(this.items);
    });
  }

  showModal(): void {
    this.confirm.success('11111', '1111122222').subscribe();
    // this.modalÎ
    //   .create(Modal, {})
    //   .present()
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
