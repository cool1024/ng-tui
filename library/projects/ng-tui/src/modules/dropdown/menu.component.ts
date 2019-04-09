import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ViewTool } from '../../tui-core/component-creator/view-tool.class';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';

@Component({
    template: `
        <div #menuView
            [ngStyle]="{minWidth:minWidth+'px'}"
            style="opacity:0"
            class="bg-white animated shadow-sm no-select py-2 position-absolute d-inline-block">
            <a *ngFor="let item of items;index as i"
               (click)="itemClick(item,i)"
               class="dropdown-item pointer py-2"
               close>{{item}}</a>
        </div>`
})
export class MenuComponent implements TUIComponent {

    @ViewChild('menuView') menuView: ElementRef;
    items = new Array<string>();
    position: string;
    offsetX: number;
    offsetY: number;
    viewTool: ViewTool;
    minWidth: number;
    handle: ComponentHandle;
    animation: string;


    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.viewTool.targetDom && this.viewTool.toggleDom) {
            if ((!this.viewTool.targetDom.contains(dom)) && (!this.viewTool.toggleDom.contains(dom))) {
                this.handle.destroy();
            }
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
            }
            setTimeout(() => {
                this.viewTool.targetDom.style.opacity = '1';
                this.viewTool.targetDom.classList.add(this.animation);
            });
        }, 100);
    }

    dismiss() {

    }

    destroy() { }
}
