import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { OffcanvasComponent } from './offcanvas.component';

@Injectable()
export class OffcanvasService {
  constructor(private cmpService: ComponentService) {}

  create(content: any, options: OffcanvasOptions): ComponentHandle {
    const mHandle = this.cmpService.create(OffcanvasComponent);
    const modalContainer = mHandle.dom.querySelector(
      '.offcanvas-body'
    ) as HTMLElement;
    const vHandle = this.cmpService.createWithAttachView(
      content,
      modalContainer
    );
    const offCanvas = mHandle.instance as OffcanvasComponent;
    offCanvas.handle = vHandle;
    offCanvas.title = options.title;
    offCanvas.position = options.position;

    modalContainer.removeChild(vHandle.dom);
    modalContainer.appendChild(vHandle.dom.firstChild);
    vHandle.setParent(mHandle);
    return vHandle;
  }
}

export interface OffcanvasOptions {
  title: string;
  position: string;
}
