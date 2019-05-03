import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { ModalComponent } from './modal.component';
import { ModalHandle } from './modal.handle';

@Injectable()
export class ModalService {

    constructor(
        private cmp: ComponentService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector,
    ) { }

    create(content: any) {
        const handle = new ModalHandle();
        const activeHandle = this.cmp.create(ModalComponent);
        activeHandle.instance.handle = activeHandle;
        handle.cmpHandle = activeHandle;
        handle.content = content;
        handle.injector = this.injector;
        handle.resolver = this.componentFactoryResolver;
        handle.aprf = this.applicationRef;
        return new ModalHandle();
    }

}
