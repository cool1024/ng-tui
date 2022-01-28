import { Component } from '@angular/core';
import { ComponentHandleService } from 'projects/ng-tui/src/tui-core/component-creator/handle.service';

@Component({
  templateUrl: './modal.html'
})
export class Modal {
  data = '32321';
  constructor(public handle: ComponentHandleService) { }

  closePage(): void {
    this.handle.close('你好');
  }
}
