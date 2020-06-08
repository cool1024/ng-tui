import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Util } from '../util';

@Directive({
    selector: '*[tsHover]'
})
export class TsHover implements AfterViewInit {

    @Input()
    tsHover: string | string[] = [];

    @Input()
    set hoverActive(active: boolean) {
        this._hoverActive = active || false;
        this.applyStyle(this.elementRef.nativeElement, active ? 2 : 0);
    }

    @Input()
    hoverStyle: { [key: string]: [string, string, string] } = {};

    @Output()
    hover = new EventEmitter<MouseEvent>(false);

    private _hoverActive: boolean;

    constructor(private elementRef: ElementRef) { }

    @HostListener('mouseleave', ['$event'])
    removeClass($event: MouseEvent) {
        const element = $event.target as HTMLElement;
        if (Util.notEmpty(this.tsHover)) {
            element.classList.remove(...Util.getStringArray(this.tsHover));
        }
        this.applyStyle(element, this._hoverActive ? 2 : 0);
    }

    @HostListener('mouseenter', ['$event'])
    addClass($event: MouseEvent) {
        const element = $event.target as HTMLElement;
        if (Util.notEmpty(this.tsHover)) {
            element.classList.add(...Util.getStringArray(this.tsHover));
        }
        this.applyStyle(element, 1);
        this.hover.emit($event);
    }


    applyStyle(dom: HTMLElement, styleNum: number) {
        if (dom === undefined) {
            return;
        }
        for (let key in this.hoverStyle) {
            dom.style[key] = this.hoverStyle[key][styleNum];
        }
    }

    ngAfterViewInit() {
        this.applyStyle(this.elementRef.nativeElement, 0);
    }
} 