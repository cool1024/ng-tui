import { ModalComponent } from './modal.component';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { skipWhile, tap } from 'rxjs/operators';

export class ModalHandle {

    modalComponent!: ModalComponent;

    data: any;

    resolver!: ComponentFactoryResolver;
    aprf!: ApplicationRef;

    content: any;

    injector!: Injector;

    cmpHandle!: ComponentHandle;
    modalCmp: any;

    open(data?: any) {
        return this.present(data);
    }

    present(data?: any) {
        const componentFactory = this.resolver.resolveComponentFactory(this.content);
        this.modalCmp = componentFactory.create(this.injector);
        this.aprf.attachView(this.modalCmp.hostView);
        setTimeout((_: any) => {
            const hostView: HTMLDivElement = this.cmpHandle.instance.pad.nativeElement;
            hostView.classList.add('d-block');
            hostView.append(this.modalCmp.location.nativeElement.firstChild);
        });
        this.modalCmp.instance.handle = this.cmpHandle;
        this.data = data || this.data || {};
        Object.assign(this.modalCmp.instance, this.data);
        return this.cmpHandle.present().pipe(skipWhile(data => data === undefined));
    }

    dismiss(data?: any) {
        this.modalCmp.destroy(data);
    }

    close() {
        this.modalCmp.destroy();
    }
}
