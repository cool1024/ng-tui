import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Type,
  Injector,
} from '@angular/core';
import { ComponentHandleService } from './handle.service';
import { ComponentHandle } from './handle.class';
import { TUIComponent } from './component.interface';

@Injectable()
export class ComponentService {
  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  create(component: Type<TUIComponent>): ComponentHandle {
    const body = document.body;
    return this.createWithAttachView(component, body);
  }

  createWithAttachView(
    component: Type<TUIComponent>,
    attachView: HTMLElement
  ): ComponentHandle {
    const instance =
      this.componentFactoryResolver.resolveComponentFactory<TUIComponent>(
        component
      );

    const handle = new ComponentHandle();
    const injector = Injector.create({
      providers: [{ provide: ComponentHandleService, useValue: handle }],
      parent: this.injector,
    });
    const windowCmptRef = instance.create(injector);
    handle.setRef(windowCmptRef);
    this.applicationRef.attachView(windowCmptRef.hostView);
    attachView.appendChild(handle.dom);
    return handle;
  }
}
