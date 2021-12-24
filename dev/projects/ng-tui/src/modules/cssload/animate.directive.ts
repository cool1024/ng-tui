import { Input, Directive, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
    selector: '*[tsAnimate]',
    exportAs: 'tsAnimate',
})
export class AnimateDirective {
    @Input() tsAnimate!: string;
    @Input() timer = 500;

    constructor(private elementRef: ElementRef) {}

    showAnimate(): void {
        const targetDom: HTMLElement = this.elementRef.nativeElement;
        targetDom.classList.add('animated', this.tsAnimate);
        // tslint:disable-next-line: deprecation
        timer(this.timer).subscribe(() => targetDom.classList.remove('animated', this.tsAnimate));
    }
}
