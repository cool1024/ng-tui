import { Input, Directive, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
@Directive({
    selector: `*[tsLoad]`,
    exportAs: 'tsLoad',
})
export class TableLoadDirective implements AfterViewInit, OnDestroy {

    @Input() set tsLoad(display: boolean) {
        this.display = display;
        display ? this.present() : this.dismiss();
    }

    display: boolean;

    loadDom: HTMLDivElement;
    parentDom: HTMLElement;

    constructor(private elementRef: ElementRef) { }

    createDom() {
        if (!this.loadDom) {
            this.loadDom = document.createElement('div');
            this.loadDom.classList.add('table-loader', 'h-100', 'w-100', 'position-absolute', 'left', 'top', 'd-flex');
            this.loadDom.innerHTML = '<div class="d-flex align-self-center justify-content-center text-center w-100"><div class="dot-animate"></div></div>';
        }
        if (this.parentDom) {
            this.parentDom.insertBefore(this.loadDom, this.parentDom.firstChild);
        }
    }

    removeDom() {
        this.loadDom && this.loadDom.parentElement.removeChild(this.loadDom);
    }

    present() {
        this.createDom();
    }

    dismiss() {
        this.removeDom();
    }

    ngAfterViewInit() {
        this.parentDom = this.elementRef.nativeElement.parentElement;
        this.tsLoad = this.display;
    }

    ngOnDestroy() {
        this.dismiss();
        this.loadDom = null;
    }
}
