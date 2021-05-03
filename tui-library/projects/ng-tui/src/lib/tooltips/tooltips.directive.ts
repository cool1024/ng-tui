import { Directive, Input, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TooltipsInstance } from './tooltips.interface';
declare const Tooltip: any;

@Directive({
    selector: '[tsTip]',
})
export class TooltipsDirective implements AfterViewInit, OnChanges, OnDestroy {
    @Input() tsTip!: string;

    @Input() placement: string;

    private instance!: TooltipsInstance;

    constructor(private el: ElementRef) {
        this.placement = 'top';
    }

    ngOnChanges(simpleChanges: SimpleChanges): void {
        if (this.instance && simpleChanges.tsTip && !simpleChanges.tsTip.firstChange) {
            this.instance.updateTitleContent(simpleChanges.tsTip.currentValue);
        }
    }

    ngAfterViewInit(): void {
        this.instance = new Tooltip(this.el.nativeElement, {
            title: this.tsTip,
            placement: this.placement,
            delay: 100,
        });
    }

    ngOnDestroy(): void {
        this.instance.dispose();
    }
}
