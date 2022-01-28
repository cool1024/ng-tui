import { AfterViewInit, Component, ComponentFactoryResolver, Type, ViewChild } from "@angular/core";
import { HostDirective } from "../directive/host.directive";
import { ToggleDirective } from "../directive/toggle.directive";
import { TUIComponent } from "./component.interface";
import { ComponentHandle } from "./handle.class";
import { ViewDirective } from "./view.directive";
import { ViewOption } from "./view.interface";

@Component({
    template: `<div [tsView]="viewOption.position"
                    [offsetX]="viewOption.offsetX"
                    [offsetY]="viewOption.offsetY"
                    [fitWidth]="viewOption.fitWidth"
                    [style.zIndex]="viewOption.zIndex"
                    (displayChange)="changeHandle($event)">
                    <ng-template tsHost></ng-template>
                </div>`
})
export class ViewComponent implements TUIComponent, AfterViewInit {


    @ViewChild(HostDirective, { static: true }) host!: HostDirective;

    @ViewChild(ViewDirective) view!: ViewDirective;

    viewOption!: ViewOption;

    toggle!: ToggleDirective;

    handle!: ComponentHandle;


    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    loadComponent(component: Type<any>, handle: ComponentHandle) {
        const viewContainerRef = this.host.viewContainerRef;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        viewContainerRef.createComponent<TUIComponent>(componentFactory);
        this.handle = handle;
    }

    changeHandle(status: boolean): void {
        if (!status) {
            this.handle.destroy();
        }
    }

    ngAfterViewInit(): void {
        this.view.toggle(this.toggle);
    }

    tuiOnPresent(): void { }
    tuiOnDismiss(): void { }
    tuiOnClose(): void { }
}