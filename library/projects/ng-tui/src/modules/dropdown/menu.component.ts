import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ViewTool } from '../../tui-core/component-creator/view-tool.class';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';

@Component({
    template: `
        <div #menuView
            [ngStyle]="{minWidth:minWidth+'px',zIndex:zIndex}"
            style="opacity:0"
            class="bg-white animated shadow no-select py-2 position-absolute d-inline-block">
            <ng-container *ngFor="let item of items;index as i">
                <a *ngIf="item" (click)="itemClick(item,i)"
                    class="dropdown-item pointer"
                    close>{{item}}</a>
                <div *ngIf="item===''" class="dropdown-divider"></div>
            </ng-container>
        </div>`
})
export class MenuComponent implements TUIComponent, AfterViewInit {

    @ViewChild('menuView') menuView: ElementRef;
    items = new Array<string>();
    position: string;
    zIndex: string;
    offsetX: number;
    offsetY: number;
    viewTool: ViewTool;
    minWidth: number;
    handle: ComponentHandle;
    animation: string;

    autoHandle: () => void;

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.viewTool.targetDom && this.viewTool.toggleDom) {
            if ((!this.viewTool.targetDom.contains(dom)) && (!this.viewTool.toggleDom.contains(dom))) {
                this.handle.destroy();
            }
        }
    }

    ngAfterViewInit() {
        if (this.position === 'auto') {
            this.autoHandle = () => this.viewTool.autoPosition(this.offsetX, this.offsetX);
            window.addEventListener('resize', this.autoHandle, false);
        }
    }

    itemClick(item: string, index: number) {
        this.handle.destroy({ text: item, value: index });
    }

    present() {
        this.viewTool.targetDom = this.menuView.nativeElement;
        setTimeout(() => {
            switch (this.position) {
                case 'bottom':
                    this.viewTool.autoPositionBottom(this.offsetX, this.offsetY);
                    break;
                case 'top': this.viewTool.autoPositionTop(this.offsetX, this.offsetY);
                    break;
                case 'auto': this.viewTool.autoPosition(this.offsetX, this.offsetY);
                    break;
            }
            setTimeout(() => {
                this.viewTool.targetDom.style.opacity = '1';
                this.viewTool.targetDom.classList.add(this.animation);
            });
        }, 100);
    }

    dismiss() {
        this.destroy();
    }

    destroy() {
        this.autoHandle && window.removeEventListener('scroll', this.autoHandle);
    }
}
