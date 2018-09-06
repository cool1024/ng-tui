import { Component, ViewChild, ComponentFactoryResolver, Injector, ComponentRef } from '@angular/core';
import { WindowDirective } from './window.directive';

@Component({
    selector: 'ts-window',
    template: `
    <div [class.d-none]="!show"
        [class.zoomIn]="!ready"
        [ngStyle]="windowStyle"
        class="animated position-fixed h-100 w-100">
        <ng-template tsWindowHost></ng-template>
    </div>
    `
})
export class WindowComponent {

    windowStyle: any;

    show = false;

    ready = false;

    @ViewChild(WindowDirective) modalHost: WindowDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.windowStyle = {
            top: 0,
            left: 0,
            zIndex: 1060,
        };
    }

    loadComponent(content: any, index: number, injector: Injector): ComponentRef<any> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.modalHost.viewContainerRef.clear();
        this.windowStyle.zIndex += index;
        return this.modalHost.viewContainerRef.createComponent(componentFactory, undefined, injector);
    }

    present() {
        this.show = true;
        setTimeout(() => this.ready = true, 2000);
    }
    close() { this.show = false; }
}
