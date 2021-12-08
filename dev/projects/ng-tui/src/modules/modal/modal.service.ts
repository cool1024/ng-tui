import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';

@Injectable()
export class ModalService {
  constructor(private cmpService: ComponentService) {}

  create(content: any, data: any = {}): ComponentHandle {
    const mHandle = this.cmpService.create(ModalComponent);
    const modalContainer = mHandle.dom.querySelector('.modal') as HTMLElement;
    const vHandle = this.cmpService.createWithAttachView(
      content,
      modalContainer
    );
    (mHandle.instance as ModalComponent).handle = vHandle;
    Object.assign(vHandle.instance, data);
    modalContainer.removeChild(vHandle.dom);
    modalContainer.appendChild(vHandle.dom.firstChild);
    vHandle.setParent(mHandle);
    return vHandle;
  }
}
