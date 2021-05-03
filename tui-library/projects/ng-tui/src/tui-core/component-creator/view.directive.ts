import {
    Directive,
    ElementRef,
    AfterViewInit,
    Input,
    HostListener,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core';
import { Toggle } from '../interface/toggle.interface';
import { ToggleDirective } from '../directive/toggle.directive';
import { ViewTool } from './view-tool.class';
import { ThemeDirective } from '../directive/theme.directive';
import { ViewPosition } from '../const';

@Directive({
    selector: `*[tsView]`,
    exportAs: 'tsView',
})
export class ViewDirective extends ThemeDirective implements AfterViewInit, OnDestroy, Toggle {
    @Input() set tsView(classStr: string) {
        this.appenClass = classStr;
    }
    @Input() position: string;
    @Input() offsetX: number;
    @Input() offsetY: number;
    @Input() autoSize: string;
    @Output() displayChange = new EventEmitter<boolean>(false);

    dom?: HTMLElement;
    appenClass: string;
    viewTool: ViewTool;
    isActive: boolean;
    autoHandle?: () => void;

    constructor(public elementRef: ElementRef) {
        super();
        this.appenClass = '';
        this.isActive = false;
        this.viewTool = new ViewTool();
        this.position = ViewPosition.Bottom;
        this.offsetX = 0;
        this.offsetY = 0;
        this.autoSize = '';
    }

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.viewTool.targetDom && this.viewTool.toggleDom) {
            if (!this.viewTool.targetDom.contains(dom) && !this.viewTool.toggleDom.contains(dom)) {
                !dom.hasAttribute('hold') && this.dismiss();
            } else if (this.viewTool.targetDom.contains(dom)) {
                dom.hasAttribute('close') && dom.getAttribute('close') !== 'false' && this.dismiss();
            }
        }
    }

    ngAfterViewInit(): void {
        this.dom = this.elementRef.nativeElement;
        if (this.dom) {
            this.dom.classList.add('position-fixed', 'd-none', 'animated');
            this.dom.style.top = '0px';
            this.dom.style.left = '0px;';
            this.viewTool.targetDom = this.dom;
            document.body.appendChild(this.dom);
            if (this.position === ViewPosition.Auto) {
                this.autoHandle = () =>
                    this.viewTool.autoPosition(this.offsetX, this.offsetY, this.isApply(this.autoSize));
                window.addEventListener('resize', this.autoHandle, false);
            }
        }
    }

    bind(toggle: ToggleDirective): void {
        this.viewTool.toggleDom = toggle.dom;
    }

    toggle(): void {
        if (!this.isActive && this.dom) {
            this.dom.classList.remove('d-none');
            this.dom.style.opacity = '0';
            const size = this.isApply(this.autoSize);

            if (this.position === ViewPosition.Bottom) {
                this.viewTool.autoPositionBottom(this.offsetX, this.offsetY, size);
            }
            if (this.position === ViewPosition.Top) {
                this.viewTool.autoPositionTop(this.offsetX, this.offsetY, size);
            }
            if (this.position === ViewPosition.Auto) {
                this.viewTool.autoPosition(this.offsetX, this.offsetY, size);
            }
            const dom = this.dom;
            setTimeout(() => {
                dom.classList.add(this.appenClass);
                dom.style.opacity = '1';
            }, 200);
            this.isActive = true;
        }
        this.displayChange.emit(true);
    }

    dismiss(): void {
        if (this.isActive && this.dom) {
            this.dom.classList.add('d-none');
            this.isActive = false;
            this.viewTool.clean();
        }
        this.displayChange.emit(false);
    }

    ngOnDestroy(): void {
        this.viewTool.clean();
        if (this.dom) {
            this.dom.parentNode && this.dom.parentNode.removeChild(this.dom);
            this.autoHandle && window.removeEventListener('resize', this.autoHandle);
        }
    }
}
