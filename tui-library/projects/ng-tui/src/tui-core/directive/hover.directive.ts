import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Util } from '../util';

@Directive({
    selector: '*[tsHover]',
    exportAs: 'tsHover',
})
export class TsHoverDirective implements AfterViewInit {
    @Input()
    tsHover: string | string[] = [];

    @Input()
    set hoverActive(active: boolean) {
        this.mHoverActive = active || false;
        this.applyStyle(this.elementRef.nativeElement, active ? 2 : 0);
    }

    @Input()
    hoverStyle: { [key: string]: [string, string, string] } = {};

    @Output()
    hover = new EventEmitter<boolean>(false);

    private mHoverActive?: boolean;

    public isHover = false;

    constructor(private elementRef: ElementRef) {}

    @HostListener('mouseleave', ['$event'])
    removeClass($event: MouseEvent): void {
        const element = $event.target as HTMLElement;
        if (Util.notNullAndEmpty(this.tsHover)) {
            element.classList.remove(...Util.getStringArray(this.tsHover));
        }
        this.isHover = false;
        this.applyStyle(element, this.mHoverActive ? 2 : 0);
        this.hover.emit(false);
    }

    @HostListener('mouseenter', ['$event'])
    addClass($event: MouseEvent): void {
        const element = $event.target as HTMLElement;
        if (Util.notNullAndEmpty(this.tsHover)) {
            element.classList.add(...Util.getStringArray(this.tsHover));
        }
        this.applyStyle(element, 1);
        this.isHover = true;
        this.hover.emit(true);
    }

    applyStyle(dom: HTMLElement, styleNum: number): void {
        if (dom === undefined) {
            return;
        }
        for (const key in this.hoverStyle) {
            if (this.hoverStyle[key][styleNum]) {
                (dom.style as any)[key] = this.hoverStyle[key][styleNum];
            }
        }
    }

    ngAfterViewInit(): void {
        this.applyStyle(this.elementRef.nativeElement, 0);
    }
}
