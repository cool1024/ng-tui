import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';
import { Toggle } from './../../tui-core/interfaces/toggle.interface';

@Directive({
    selector: '*[tsCollapse]',
    exportAs: 'tsCollapse',
})
export class CollapseDirective implements AfterViewInit, OnChanges, Toggle {

    @Input() open: boolean;

    @Output() openChange = new EventEmitter<boolean>(false);

    private pad: HTMLElement;

    private isReady: boolean;

    constructor(private elementRef: ElementRef, private htmlDomService: HtmlDomService) {
        this.open = false;
        this.isReady = false;
    }

    ngOnChanges() {
        if (this.isReady) {
            this.open ? this.collapseOpen() : this.collapseClose();
        }
    }

    ngAfterViewInit() {
        this.pad = this.elementRef.nativeElement;
        this.pad.style.overflow += 'hidden';
        this.open ? this.collapseOpen() : this.collapseClose();
        this.isReady = true;
    }

    collapseClose() {
        this.open = false;
        const height = this.htmlDomService.getExpHeight(this.pad);
        this.pad.style.height = height + 'px';
        setTimeout(() => { this.pad.style.height = '0px'; }, 100);
        this.openChange.emit(this.open);
    }

    collapseOpen() {
        this.open = true;
        this.pad.style.height = '';
        const height = this.htmlDomService.getExpHeight(this.pad);
        this.pad.style.height = '0px';
        this.pad.style.transition = 'height .35s ease';
        setTimeout(() => { this.pad.style.height = height + 'px'; });
        setTimeout(() => { this.pad.style.height = ''; }, 350);
        this.openChange.emit(this.open);
    }

    toggle() {
        this.open ? this.collapseClose() : this.collapseOpen();
    }
}
