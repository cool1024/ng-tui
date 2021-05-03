import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Toggle } from '../../tui-core/interfaces/toggle.interface';
import { BootstrapClass, AnimateCssClass } from '../../tui-core/base-class/default-value';

@Directive({
    selector: '*[tsCollapse]',
    exportAs: 'tsCollapse',
})
export class CollapseDirective implements AfterViewInit, OnChanges, Toggle {

    @Input() open: boolean;

    @Output() openChange = new EventEmitter<boolean>();

    private pad!: HTMLElement;

    constructor(private elementRef: ElementRef) {
        this.open = false;
    }

    ngOnChanges(): void {
        this.updateCollapseShow();
    }

    ngAfterViewInit() {
        this.pad = this.elementRef.nativeElement;
        this.updateCollapseShow(true);
    }

    updateCollapseShow(ignoreEmit = false) {
        if (this.pad) {
            this.open ? this.pad.classList.remove(BootstrapClass.DisplayNone) : this.pad.classList.add(BootstrapClass.DisplayNone);
            if (!ignoreEmit) this.openChange.emit(this.open);
        }
    }

    toggle() {
        this.open = !this.open;
        this.updateCollapseShow();
    }
}