import { Directive, ElementRef, OnDestroy, HostListener, Input, Output, EventEmitter, AfterViewInit, ContentChild } from '@angular/core';
import { Toggle } from '../../tui-core/interfaces/toggle.interface';
import { ToggleDirective } from '../../tui-core/directives/toggle.directives';
import { interval, Subscription } from 'rxjs';
import { ViewTool } from '../../tui-core/component-creator/view-tool.class';

@Directive({
    selector: '*[tsSideMenu]',
    exportAs: 'tsSideMenu',
})
export class SideMenuDirective implements Toggle, OnDestroy {

    @Input() tsSideMenu: string;
    @Input() animation: string;
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

    constructor(private elementRef: ElementRef) {
        this.tsSideMenu = 'click';
        this.animation = 'zoomIn';
    }

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.hostDom && this.targetDom) {
            if ((!this.hostDom.contains(dom)) && (!this.targetDom.contains(dom))) {
                this.dismiss();
            } else if (this.hostDom.contains(dom)) {
                // tslint:disable-next-line:no-unused-expression
                (dom.hasAttribute('close') && dom.getAttribute('close') !== 'false') && this.dismiss();
            }
        }
    }

    bind(toggle: ToggleDirective) {
        this.targetDom = toggle.elementRef.nativeElement;
        this.hostDom = this.elementRef.nativeElement;
        this.hostDom.classList.add('position-fixed', 'd-none', 'animated', this.animation);
        document.body.append(this.hostDom);
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
        const viewTool = new ViewTool();
        const rect = viewTool.getRect(this.targetDom);
        // 越界修正
        setTimeout(() => {
            const h = viewTool.getRect(this.hostDom).h;
            let offset = (window.innerHeight - (h + rect.y));
            // tslint:disable-next-line:no-unused-expression
            offset > 0 && (offset = 0);
            style.top = rect.y + offset + 'px';
            style.left = rect.w + rect.x + 'px';
        });
    }

    ngOnDestroy() {
        try {
            document.body.removeChild(this.hostDom);
        } catch (e) {
            console.log('SideMenu remove error');
        }
        this.intervalSub && this.intervalSub.unsubscribe();
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

