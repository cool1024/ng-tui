import { Input, Directive, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
    selector: '*[tsAnimate]',
    exportAs: 'tsAnimate'
})
export class AnimateDirective {

    @Input() tsAnimate: string;
    @Input() timer = 500;

    constructor(
        private elementRef: ElementRef,
    ) { }

    showAnimate() {
        const targetDom: HTMLElement = this.elementRef.nativeElement;
        targetDom.classList.add('animated', this.tsAnimate);
        timer(1000).subscribe(() => targetDom.classList.remove('animated', this.tsAnimate));
    }
}
