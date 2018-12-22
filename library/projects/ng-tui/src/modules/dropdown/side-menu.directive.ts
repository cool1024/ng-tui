import { Directive, ElementRef, OnDestroy, HostListener, Input, Output, EventEmitter, AfterViewInit, ContentChild } from '@angular/core';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';
import { Toggle } from '../../tui-core/interfaces/toggle.interface';
import { ToggleDirective } from '../../tui-core/directives/toggle.directives';
import { interval, Subscription } from 'rxjs';

@Directive({
    selector: '*[tsSideMenu]',
    exportAs: 'tsSideMenu',
})
export class SideMenuDirective implements Toggle, OnDestroy {

    @Input() tsSideMenu: string;
    @Output() displayChange = new EventEmitter<boolean>(false);


    private targetDom: HTMLElement;
    private hostDom: HTMLElement;
    private intervalSub: Subscription;
    private isShow = false;

    @HostListener('mouseleave') onmouseleave() {
        if (this.tsSideMenu === 'hover') {
            this.dismiss();
        }
    }

    constructor(private html: HtmlDomService, private elementRef: ElementRef) {
        this.tsSideMenu = 'click';
    }

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.hostDom && this.targetDom) {
            if ((!this.hostDom.contains(dom)) && (!this.targetDom.contains(dom))) {
                this.dismiss();
            } else if (this.hostDom.contains(dom)) {
                // tslint:disable-next-line:no-unused-expression
                dom.hasAttribute('close') && this.dismiss();
            }
        }
    }

    bind(toggle: ToggleDirective) {
        this.targetDom = toggle.elementRef.nativeElement;
        this.hostDom = this.elementRef.nativeElement;
        this.hostDom.classList.add('position-fixed', 'd-none', 'animated', 'zoomInLeft');
        this.intervalSub = interval(500).subscribe(() => this.autoPosition());
        // tslint:disable-next-line:no-unused-expression
        this.tsSideMenu === 'hover' && (toggle.hover = () => this.toggle());
    }

    toggle() {
        this.hostDom.classList.remove('d-none');
        this.autoPosition();
        this.isShow = true;
        this.displayChange.emit(this.isShow);
    }

    dismiss() {
        this.isShow = false;
        this.hostDom.classList.add('d-none');
        this.displayChange.emit(this.isShow);
    }

    autoPosition() {
        const style = this.hostDom.style;
        const p = this.html.getPosition(this.targetDom);
        const w = this.html.getWidth(this.targetDom);
        // 越界修正
        setTimeout(() => {
            const h = this.html.getHeight(this.hostDom);
            let offset = (window.innerHeight - (h + p.y));
            // tslint:disable-next-line:no-unused-expression
            offset > 0 && (offset = 0);
            style.top = p.y + offset + 'px';
            style.left = w + p.x + 'px';
        });
    }

    ngOnDestroy() {
        return this.intervalSub && this.intervalSub.unsubscribe();
    }
}

@Directive({
    selector: `[tsMenuGroup]`,
    exportAs: 'tsMenuGroup'
})
export class SideMenuGroupDirective implements AfterViewInit {

    @ContentChild(ToggleDirective) toggleDirective: ToggleDirective;
    @ContentChild(SideMenuDirective) targetDirective: SideMenuDirective;

    constructor() { }

    ngAfterViewInit() {
        this.targetDirective.bind(this.toggleDirective);
        this.toggleDirective.target = this.targetDirective;
    }

    dismiss() {
        this.targetDirective.dismiss();
    }
}

