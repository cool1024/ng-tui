import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[tsHost]'
})
export class HostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}