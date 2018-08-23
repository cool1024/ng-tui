import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { WindowComponent } from './window.component';
import { WindowHandle } from './window.class';
import { WindowViewService } from './window-view.service';

@Injectable()
export class WindowService {

    private baseComponents: ComponentFactory<WindowComponent>[] = [];
    private windowCmptRefs: ComponentRef<WindowComponent>[] = [];
    private windowhandles: WindowHandle[] = [];
    private containerEl: HTMLBodyElement;

    constructor(
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) { }

    private init(): number {
        const baseComponent = this.componentFactoryResolver.resolveComponentFactory(WindowComponent);
        const windowCmptRef = baseComponent.create(this.injector);
        this.applicationRef.attachView(windowCmptRef.hostView);
        this.containerEl = document.querySelector('body');
        this.containerEl.appendChild(windowCmptRef.location.nativeElement);
        this.baseComponents.push(baseComponent);
        this.windowCmptRefs.push(windowCmptRef);
        return this.baseComponents.length - 1;
    }

    push(content: any): WindowHandle {
        const index = this.init();
        const handle = new WindowHandle();
        const injector = Injector.create([{ provide: WindowViewService, useValue: handle }], this.injector);
        handle.instance = this.windowCmptRefs[index].instance.loadComponent(content, index, injector).instance;
        handle.ref = this.windowCmptRefs[index];
        handle.index = index;
        this.windowhandles.push(handle);
        return handle;
    }

    pop() {
        const length = this.windowhandles.length;
        if (length > 0) {
            this.windowhandles.pop().close();
            this.baseComponents.pop();
            this.windowCmptRefs.pop().destroy();
        }
    }
}
