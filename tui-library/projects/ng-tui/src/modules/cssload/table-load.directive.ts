import { Input, Directive, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { BootstrapClass } from '../../tui-core/const';
@Directive({
    selector: `*[tsLoad]`,
    exportAs: 'tsLoad',
})
export class TableLoadDirective implements AfterViewInit, OnDestroy {
    @Input() set tsLoad(display: boolean) {
        this.display = display;
        display ? this.present() : this.dismiss();
    }

    display!: boolean;
    loadDom?: HTMLDivElement;
    parentDom!: HTMLElement;

    constructor(private elementRef: ElementRef) {}

    createDom(): void {
        if (!this.loadDom) {
            this.loadDom = document.createElement('div');
            this.loadDom.classList.add('table-loader', 'h-100', 'w-100', 'position-absolute', 'left', 'top', 'd-flex');
            this.loadDom.innerHTML =
                '<div class="d-flex align-self-center justify-content-center text-center w-100"><div class="dot-animate"></div></div>';
        }
        if (this.parentDom) {
            this.parentDom.insertBefore(this.loadDom, this.parentDom.firstChild);
        }
    }

    removeDom(): void {
        this.loadDom && this.loadDom.parentElement && this.loadDom.parentElement.removeChild(this.loadDom);
    }

    present(): void {
        this.createDom();
    }

    dismiss(): void {
        this.removeDom();
    }

    ngAfterViewInit(): void {
        this.parentDom = this.elementRef.nativeElement.parentElement;
        this.parentDom.classList.add(BootstrapClass.PositionRelative);
        this.tsLoad = this.display;
    }

    ngOnDestroy(): void {
        this.dismiss();
        this.loadDom = undefined;
    }
}
