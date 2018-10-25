import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[tsWindowHost]',
})
export class WindowDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
