import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Toggle } from '../interfaces/toggle.interface';

@Directive({
    selector: `[tsToggle]`,
    exportAs: 'tsToggle'
})
export class ToggleDirective implements AfterViewInit {

    blur: ($event: any) => void;

    @Input() target: Toggle;

    @Input() bind: Toggle;

    @Input() handleFunc: (target: any) => void;

    @HostListener('click') onClick() {
        if (this.handleFunc) {
            this.handleFunc(this.target);
        }
        return !this.target || this.target.toggle();
    }

    @HostListener('blur', ['$event']) onBlur($event: any) {
        return !this.blur || this.blur($event);
    }

    get dom(): HTMLElement | any {
        return this.elementRef.nativeElement;
    }

    constructor(public elementRef: ElementRef) { }

    ngAfterViewInit() {
        if (this.bind) {
            this.bind.bind(this);
        }
    }
}
