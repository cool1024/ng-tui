import { Directive, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { Toggle } from '../interfaces/toggle.interface';
import { ToggleDirective } from '../directives/toggle.directives';
import { ViewTool } from './view-tool.class';

@Directive({
    selector: `*[tsView]`,
    exportAs: 'tsView'
})
export class ViewDirective implements AfterViewInit, Toggle {

    @Input() set tsView(classStr: string) {
        this.appenClass = classStr;
    }

    dom: HTMLElement;
    appenClass: string;
    viewTool: ViewTool;
    isActive: boolean;

    constructor(public elementRef: ElementRef) {
        this.appenClass = '';
        this.isActive = false;
        this.viewTool = new ViewTool();
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
        this.dom.classList.add('position-absolute', 'invisible', 'animated', this.appenClass);
        this.viewTool.targetDom = this.dom;
        document.body.appendChild(this.dom);
    }

    bind(toggle: ToggleDirective) {
        this.viewTool.toggleDom = toggle.dom;
    }

    toggle() {
        if (!this.isActive) {
            this.viewTool.autoPositionBottom();
            this.dom.classList.remove('invisible');
            this.isActive = true;
        }
    }

    dismiss() {
        if (this.isActive) {
            this.dom.classList.add('invisible');
            this.isActive = false;
        }
    }
}
