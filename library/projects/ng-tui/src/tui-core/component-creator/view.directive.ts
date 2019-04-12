import { Directive, ElementRef, AfterViewInit, Input, HostListener, OnDestroy } from '@angular/core';
import { Toggle } from '../interfaces/toggle.interface';
import { ToggleDirective } from '../directives/toggle.directives';
import { ViewTool } from './view-tool.class';

@Directive({
    selector: `*[tsView]`,
    exportAs: 'tsView'
})
export class ViewDirective implements AfterViewInit, OnDestroy, Toggle {

    @Input() set tsView(classStr: string) {
        this.appenClass = classStr;
    }
    @Input() position: string;
    @Input() offsetX: number;
    @Input() offsetY: number;

    dom: HTMLElement;
    appenClass: string;
    viewTool: ViewTool;
    isActive: boolean;

    constructor(public elementRef: ElementRef) {
        this.appenClass = '';
        this.isActive = false;
        this.viewTool = new ViewTool();
        this.position = 'bottom';
        this.offsetX = 0;
        this.offsetY = 0;
    }

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.viewTool.targetDom && this.viewTool.toggleDom) {
            if ((!this.viewTool.targetDom.contains(dom)) && (!this.viewTool.toggleDom.contains(dom))) {
                this.dismiss();
            } else if (this.viewTool.targetDom.contains(dom)) {
                // tslint:disable-next-line:no-unused-expression
                (dom.hasAttribute('close') && dom.getAttribute('close') !== 'false') && this.dismiss();
            }
        }
    }

    ngAfterViewInit() {
        this.dom = this.elementRef.nativeElement;
        this.dom.classList.add('position-fixed', 'd-none', 'animated');
        this.viewTool.targetDom = this.dom;
        document.body.appendChild(this.dom);
    }

    bind(toggle: ToggleDirective) {
        this.viewTool.toggleDom = toggle.dom;
    }

    toggle() {
        if (!this.isActive) {
            console.log(this.viewTool.getRect(this.viewTool.toggleDom));
            this.dom.classList.remove('d-none');
            this.dom.style.opacity = '0';
            console.log(this.offsetY);
            if (this.position === 'bottom') {
                this.viewTool.autoPositionBottom(this.offsetX, this.offsetY);
            }
            if (this.position === 'top') {
                this.viewTool.autoPositionTop(this.offsetX, this.offsetY);
            }
            setTimeout(() => {
                this.dom.classList.add(this.appenClass);
                this.dom.style.opacity = '1';
            }, 100);
            this.isActive = true;
        }
    }

    dismiss() {
        if (this.isActive) {
            this.dom.classList.add('d-none');
            this.isActive = false;
            this.viewTool.clean();
        }
    }

    ngOnDestroy() {
        this.viewTool.clean();
    }
}
