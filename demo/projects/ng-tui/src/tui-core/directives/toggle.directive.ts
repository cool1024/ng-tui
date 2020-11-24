import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Toggle } from '../interfaces/toggle.interface';

@Directive({
    selector: `*[tsToggle]`,
    exportAs: 'tsToggle'
})
export class ToggleDirective implements AfterViewInit {

    @Input() target: Toggle;

    @Input() bind: Toggle;

    @Input() handleFunc: (target: any) => void;

    @Input() bindFunc: (self: ToggleDirective) => void;

    blur: ($event: any) => void;
    hover: ($event: any) => void;

    @HostListener('click') onClick() {
        if (this.handleFunc) {
            this.handleFunc(this.target);
        }
        return !this.target || this.target.toggle();
    }

    @HostListener('blur', ['$event']) onBlur($event: any) {
        return !this.blur || this.blur($event);
    }

    @HostListener('mouseover', ['$event']) onHover($event: any) {
        return !this.hover || this.hover($event);
    }

    get dom(): HTMLElement | any {
        return this.elementRef.nativeElement;
    }

    constructor(public elementRef: ElementRef) { }

    setTarget(target: Toggle) {
        this.target = target;
    }

    ngAfterViewInit() {
        if (this.bind) {
            this.bind.bind(this);
        }
        if (this.bindFunc) {
            this.bindFunc(this);
        }
    }
}
