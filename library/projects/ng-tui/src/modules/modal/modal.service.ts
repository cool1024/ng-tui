import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { ModalComponent } from './modal.component';
import { ModalHandle } from './modal.handle';
import { ModalViewService } from './handle.service';
import { ComponentHandleService } from '../../tui-core/component-creator/handle.service';

@Injectable()
export class ModalService {

    constructor(
        private cmp: ComponentService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector,
    ) { }

    create(content: any, data: any = {}) {
        const handle = new ModalHandle();
        handle.data = data;
        const activeHandle = this.cmp.create(ModalComponent);
        activeHandle.instance.handle = activeHandle;
        activeHandle.instance.destroy = () => {
            handle.close();
        };
        handle.cmpHandle = activeHandle;
        handle.content = content;
        const injector = Injector.create({
            providers: [{ provide: ComponentHandleService, useValue: activeHandle }],
            parent: this.injector
        });
        handle.injector = injector;
        handle.resolver = this.componentFactoryResolver;
        handle.aprf = this.applicationRef;
        return handle;
    }

}
