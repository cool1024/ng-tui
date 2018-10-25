import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, ElementRef } from '@angular/core';
import { ModalComponent } from './modal.component';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ModalService {

    private baseComponent: ComponentFactory<ModalComponent>;
    private windowCmptRef: ComponentRef<ModalComponent>;
    private containerEl: HTMLBodyElement;
    private handle: Subject<any>;
    private options: any;
    public modal: ComponentRef<any>;

    constructor(
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) { }

    init(ref: ElementRef) {
        this.baseComponent = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        this.windowCmptRef = this.baseComponent.create(this.injector, [[ref]]);
        this.applicationRef.attachView(this.windowCmptRef.hostView);
        this.containerEl = document.querySelector('body');
        this.containerEl.appendChild(this.windowCmptRef.location.nativeElement);
        this.windowCmptRef.instance.closeHandle = () => {
            this.dismiss();
        };
    }

    create(content: any, options?: { size?: string, center?: boolean, scroll?: string }): ModalService {
        this.loadComponent(content);
        this.options = options;
        return this;
    }

    loadComponent(content: any) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        const componentRef = componentFactory.create(this.injector);
        this.applicationRef.attachView(componentRef.hostView);
        this.modal = componentRef;
    }

    get instance(): any {
        return this.modal.instance;
    }

    close(params?: any) {
        this.windowCmptRef.destroy();
        if (this.handle) { this.handle.next(params); }
    }

    dismiss() {
        this.windowCmptRef.destroy();
    }

    open(): Observable<any> {
        this.init(this.modal.location.nativeElement);
        if (this.options !== undefined) {
            this.windowCmptRef.instance.size = this.options.size || '';
            this.windowCmptRef.instance.center = this.options.center || false;
            this.windowCmptRef.instance.scroll = this.options.scroll || 'out';
        }
        this.handle = new Subject<any>();
        return this.handle.asObservable();
    }
}
