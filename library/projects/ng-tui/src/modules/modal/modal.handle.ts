import { ModalComponent } from './modal.component';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

export class ModalHandle {

    modalComponent: ModalComponent;

    instance: any;

    resolver: ComponentFactoryResolver;
    aprf: ApplicationRef;

    content: any;

    injector: Injector;

    cmpHandle: ComponentHandle;

    open() {
        return this.present();
    }

    present() {
        const componentFactory = this.resolver.resolveComponentFactory(this.content);
        const componentRef = componentFactory.create(this.injector);
        this.cmpHandle.instance.create(this.injector, [[componentRef.location.nativeElement]]);
        this.aprf.attachView()
        return this.cmpHandle.instance.present();
    }
}