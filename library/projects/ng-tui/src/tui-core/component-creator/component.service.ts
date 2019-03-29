import { Injectable, ApplicationRef, ComponentFactoryResolver, Type, Injector } from '@angular/core';
import { ComponentHandleService } from './handle.service';
import { ComponentHandle } from './handle.class';
import { TUIComponent } from './component.interface';

/**
 * 动态组件服务，把一些组件挂载到body上
 */
@Injectable()
export class ComponentService {

    constructor(
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) { }

    create(component: Type<TUIComponent>): ComponentHandle {
        const body = document.body;
        const instance = this.componentFactoryResolver.resolveComponentFactory<TUIComponent>(component);
        const handle = new ComponentHandle();
        const injector = Injector.create([{ provide: ComponentHandleService, useValue: handle }], this.injector);
        const windowCmptRef = instance.create(injector);
        handle.ref = windowCmptRef;
        this.applicationRef.attachView(windowCmptRef.hostView);
        body.appendChild(windowCmptRef.location.nativeElement);
        return handle;
    }
}
