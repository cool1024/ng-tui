import { Directive, ElementRef, AfterViewInit, Input, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Toggle } from '../interfaces/toggle.interface';
import { ToggleDirective } from '../directives/toggle.directives';
import { ViewTool } from './view-tool.class';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';

@Directive({
    selector: `*[tsView]`,
    exportAs: 'tsView'
})
export class ViewDirective extends BaseTheme implements AfterViewInit, OnDestroy, Toggle {

    @Input() set tsView(classStr: string) {
        this.appenClass = classStr;
    }
    @Input() position: string;
    @Input() offsetX: number;
    @Input() offsetY: number;
    @Input() autoSize: string;
    @Output() displayChange = new EventEmitter<boolean>(false);

    dom: HTMLElement;
    appenClass: string;
    viewTool: ViewTool;
    isActive: boolean;
    autoHandle: () => void;

    constructor(public elementRef: ElementRef) {
        super();
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
                (!dom.hasAttribute('hold')) && this.dismiss();
            } else if (this.viewTool.targetDom.contains(dom)) {
                // tslint:disable-next-line:no-unused-expression
                (dom.hasAttribute('close') && dom.getAttribute('close') !== 'false') && this.dismiss();
            }
        }
    }

    ngAfterViewInit() {
        this.dom = this.elementRef.nativeElement;
        this.dom.classList.add('position-fixed', 'd-none', 'animated');
        this.dom.style.top = '0px'
        this.dom.style.left = '0px;'
        this.viewTool.targetDom = this.dom;
        document.body.appendChild(this.dom);
        if (this.position === 'auto') {
            this.autoHandle = () => this.viewTool.autoPosition(this.offsetX, this.offsetY, this.isApply(this.autoSize));
            window.addEventListener('resize', this.autoHandle, false);
        }
    }

    bind(toggle: ToggleDirective) {
        this.viewTool.toggleDom = toggle.dom;
    }

    toggle() {
        if (!this.isActive) {
            this.dom.classList.remove('d-none');
            this.dom.style.opacity = '0';
            const size = this.isApply(this.autoSize);

            if (this.position === 'bottom') {
                this.viewTool.autoPositionBottom(this.offsetX, this.offsetY, size);
            }
            if (this.position === 'top') {
                this.viewTool.autoPositionTop(this.offsetX, this.offsetY, size);
            }
            if (this.position === 'auto') {
                this.viewTool.autoPosition(this.offsetX, this.offsetY, size);
            }
            setTimeout(() => {
                this.dom.classList.add(this.appenClass);
                this.dom.style.opacity = '1';
            }, 200);
            this.isActive = true;
        }
        this.displayChange.emit(true);
        console.log(1111);
    }

    dismiss() {
        if (this.isActive) {
            this.dom.classList.add('d-none');
            this.isActive = false;
            this.viewTool.clean();
        }
        this.displayChange.emit(false);
    }

    ngOnDestroy() {
        this.viewTool.clean();
        this.dom.parentNode && this.dom.parentNode.removeChild(this.dom);
        this.autoHandle && window.removeEventListener('resize', this.autoHandle);
    }
}
