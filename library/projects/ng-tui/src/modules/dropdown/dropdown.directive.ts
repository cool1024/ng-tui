import {
    ElementRef,
    Directive,
    AfterViewInit,
    Input,
    Output,
    ContentChild,
    forwardRef,
    HostBinding,
    OnInit,
    HostListener,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { ToggleDirective } from '../../tui-core/directives/toggle.directives';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';

@Directive({
    selector: `[tsDropdown]`,
    exportAs: 'tsDropdown',
})
export class DropdownDirective implements AfterViewInit, OnInit {

    @Input() dropup: string;

    @Input() class: string;

    @Input() useItemClickClose = true;

    @Output() displayChange = new EventEmitter<boolean>();

    @ContentChild(forwardRef(() => ToggleDirective)) toggleDirective: ToggleDirective;

    @ContentChild(forwardRef(() => DropMenuDirective)) dropMenuDirective: DropMenuDirective;

    @HostBinding('class') _class: string;

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: any): void {
        if ((!this.isClose()) && (!this.elementRef.nativeElement.contains(dom))) {
            this.dismiss();
        }
    }

    constructor(private elementRef: ElementRef) {
        this.dropup = null;
        this.class = '';
    }

    ngOnInit() {
        this._class = this.class + ' btn-group' + (this.dropup === null ? '' : ' dropup');
    }

    ngAfterViewInit() {
        this.toggleDirective.target = this;
        if (!this.toggleDirective.dom.type) {
            this.toggleDirective.dom.type = 'button';
        }
        this.dropMenuDirective.onClick = () => {
            if (this.useItemClickClose) {
                this.toggle();
            }
        };
    }

    toggle() {
        this.dropMenuDirective.dom.style.display === 'block' ? this.dismiss() : this.present();
    }

    isClose() {
        return this.dropMenuDirective.isClose();
    }

    present() {
        const btn = this.toggleDirective.elementRef.nativeElement;
        const rect = btn.getBoundingClientRect();
        const btnSize: [number, number] = [btn.clientWidth, btn.clientHeight];
        this.dropMenuDirective.setShowAndPostion(this.dropup !== null, btnSize, rect, btn);
        // this.dropMenuDirective.setShow(this.dropup !== null, btnSize);
        this.displayChange.emit(false);
    }

    dismiss() {
        this.dropMenuDirective.setHidden();
        this.displayChange.emit(false);
    }
}

@Directive({
    selector: `[tsDropMenu]`,
    exportAs: `tsDropMenu`,
})
export class DropMenuDirective implements AfterViewInit, OnDestroy {

    @Input() modalSize: number;

    @Input() offsetX: number;

    @Input() offsetY: number;

    @Input() autoSize: string;

    @Output() displayChange = new EventEmitter<boolean>();

    @HostBinding('class') class: string;

    @HostListener('click') onClick: any;

    autoHandle: () => void;

    dom: HTMLDivElement;

    dropup: any;
    btnDom: any;
    rect: any = null;

    constructor(
        public elementRef: ElementRef,
        private html: HtmlDomService,
    ) {
        this.class = 'dropdown-menu';
        this.offsetX = 0;
        this.offsetY = 4;
        this.modalSize = 0;
    }

    ngAfterViewInit() {
        this.dom = this.elementRef.nativeElement;
        this.dom.style.top = '0';
        this.dom.style.left = '0';
        this.autoHandle = () => {
            if (!this.isClose() && this.btnDom) {
                const rect = this.btnDom.getBoundingClientRect();
                if (this.rect && this.rect.top === rect.top && this.rect.left === rect.left) {
                    return;
                }
                const btnSize: [number, number] = [this.btnDom.clientWidth, this.btnDom.clientHeight];
                this.rect = rect;
                this.setFixedPosition(this.dropup || false, btnSize, rect);
            }
        };
        this.html.addInterval(this.autoHandle);
    }

    ngOnDestroy() {
        this.html.removeInterval(this.autoHandle);
    }

    private setFixedPosition(dropup = false, btnSize: [number, number], rect: any) {
        if (dropup !== null && dropup !== false) {
            this.dom.style.top = `${rect.top - this.dom.clientHeight + this.offsetY}px`;
            this.dom.style.left = `${rect.left + this.offsetX}px`;
        } else {
            this.dom.style.top = `${rect.top + btnSize[1] + this.offsetY}px`;
            this.dom.style.left = `${rect.left + this.offsetX}px`;
        }
        if (this.modalSize > 0) {
            const overflowX = this.overflowX();
            if (dropup !== null && dropup !== false) {
                this.dom.style.transform = `translate3d(${this.offsetX}px, -${this.dom.clientHeight + this.offsetY}px, 0px)`;
            } else {
                this.dom.style.transform = `translate3d(${this.offsetX - overflowX}px, ${btnSize[1] + this.offsetY}px, 0px)`;
            }
        }
        if (this.autoSize != null && this.autoSize !== undefined) {
            this.dom.style.width = btnSize[0] + 'px';
        }
    }

    // private setPostion(dropup = false, btnSize: [number, number]) {
    //     if (dropup !== null && dropup !== false) {
    //         this.dom.style.transform = `translate3d(${this.offsetX}px, -${this.dom.clientHeight + this.offsetY}px, 0px)`;
    //     } else {
    //         this.dom.style.transform = `translate3d(${this.offsetX}px, ${btnSize[1] + this.offsetY}px, 0px)`;
    //     }
    //     if (this.modalSize > 0) {
    //         const overflowX = this.overflowX();
    //         if (dropup !== null && dropup !== false) {
    //             this.dom.style.transform = `translate3d(${this.offsetX}px, -${this.dom.clientHeight + this.offsetY}px, 0px)`;
    //         } else {
    //             this.dom.style.transform = `translate3d(${this.offsetX - overflowX}px, ${btnSize[1] + this.offsetY}px, 0px)`;
    //         }
    //     }
    // }

    private overflowX(): number {
        const point = this.html.getPosition(this.dom);
        const w = this.html.getWidth(this.dom);
        const compare = window.innerWidth < this.modalSize ? window.innerWidth : (window.innerWidth + this.modalSize) / 2;
        const offset = (point.x + w) - compare;
        return offset > 0 ? offset + 20 : 0;
    }

    setShowAndPostion(dropup = false, btnSize: [number, number], rect: any, btn: any) {
        this.dropup = dropup;
        this.btnDom = btn;
        this.dom.style.display = 'block';
        this.dom.style.position = 'fixed';
        this.setFixedPosition(dropup, btnSize, rect);
        // this.setPostion(dropup, btnSize);
        this.displayChange.emit(true);
    }

    // setShow(dropup = false, btnSize: [number, number]) {
    //     this.dom.style.display = 'block';
    //     this.setPostion(dropup, btnSize);
    //     this.displayChange.emit(true);
    // }

    setHidden() {
        this.dom.style.display = '';
        this.displayChange.emit(false);
    }

    isClose(): boolean {
        return this.dom.style.display !== 'block';
    }
}
