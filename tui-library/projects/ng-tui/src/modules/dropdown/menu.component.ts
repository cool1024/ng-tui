import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { ViewTool } from '../../tui-core/component-creator/view-tool.class';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';

@Component({
    template: ` <div
        #menuView
        style="visibility:hidden;top:0;left:0;"
        [ngStyle]="{ minWidth: minWidth + 'px', zIndex: zIndex }"
        class="bg-white animated shadow no-select py-2 position-absolute d-inline-block;"
    >
        <ng-container *ngFor="let item of items; index as i">
            <div *ngIf="item.isLine" class="dropdown-divider"></div>
            <a *ngIf="item.isItem" (click)="itemClick(item, i)" class="dropdown-item pointer">
                <i *ngIf="item.hasIcon" class="mr-1 {{ item.icon }}"></i>{{ item.title }}
            </a>
            <div *ngIf="item.isTitle" class="dropdown-item">
                <i *ngIf="item.hasIcon" class="mr-1 {{ item.icon }}"></i>{{ item.title }}
            </div>
            <div *ngIf="item.isImage" (click)="itemClick(item, i)" class="dropdown-item">
                <img height="15" [src]="item.icon!" class="mr-2" />
                {{ item.title! }}
            </div>
        </ng-container>
    </div>`,
})
export class MenuComponent implements TUIComponent, AfterViewInit {
    @ViewChild('menuView') menuView!: ElementRef;
    items = new Array<DropMenuItem>();
    position!: string;
    zIndex!: string;
    offsetX!: number;
    offsetY!: number;
    viewTool!: ViewTool;
    minWidth!: number;
    handle!: ComponentHandle;
    animation!: string;

    @HostListener('document:click', ['$event.target']) onDocumentClick(dom: HTMLElement): void {
        if (this.viewTool.targetDom && this.viewTool.toggleDom) {
            if (!this.viewTool.targetDom.contains(dom) && !this.viewTool.toggleDom.contains(dom)) {
                this.handle.destroy();
            }
        }
    }

    ngAfterViewInit(): void {
        this.viewTool.targetDom = this.menuView.nativeElement;
        if (!this.viewTool.targetDom) {
            return;
        }
        switch (this.position) {
            case 'bottom':
                this.viewTool.autoPositionBottom(this.offsetX, this.offsetY);
                break;
            case 'top':
                this.viewTool.autoPositionTop(this.offsetX, this.offsetY);
                break;
            case 'auto':
                this.viewTool.autoPosition(this.offsetX, this.offsetY);
                break;
        }
        const targetDom = this.viewTool.targetDom;
        setTimeout(() => {
            targetDom.style.visibility = 'visible';
        }, 100);
    }

    itemClick(item: DropMenuItem, index: number): void {
        this.handle.destroy({ text: item.title, value: item.value, item, index });
    }

    present(): void {
        if (this.viewTool.targetDom) {
            this.viewTool.targetDom.classList.add(this.animation);
        }
    }

    dismiss(): void {
        this.destroy();
    }

    destroy(): void {
        this.viewTool.clean();
    }
}

export class DropMenuItem {
    get hasIcon(): boolean {
        return !!this.icon;
    }

    get isTitle(): boolean {
        return this.type === DropMenuItemType.TITLE;
    }

    get isItem(): boolean {
        return this.type === DropMenuItemType.ITEM;
    }

    get isLine(): boolean {
        return this.type === DropMenuItemType.LINE;
    }

    get isImage(): boolean {
        return this.type === DropMenuItemType.IMAGE;
    }

    constructor(public title?: string, public icon?: string, public value?: any, public type?: DropMenuItemType) {}

    public static title(title: string, icon: string = ''): DropMenuItem {
        return new DropMenuItem(title, icon, null, DropMenuItemType.TITLE);
    }

    public static label(title: string, icon: string = ''): DropMenuItem {
        return new DropMenuItem(title, icon, title, DropMenuItemType.ITEM);
    }

    public static item(title: string, value: any, icon: string = ''): DropMenuItem {
        return new DropMenuItem(title, icon, value, DropMenuItemType.ITEM);
    }

    public static split(): DropMenuItem {
        return new DropMenuItem('', '', '', DropMenuItemType.LINE);
    }

    public static image(title: string, src: string, value: any): DropMenuItem {
        return new DropMenuItem(title, src, value, DropMenuItemType.IMAGE);
    }
}

export enum DropMenuItemType {
    TITLE,
    ITEM,
    LINE,
    IMAGE,
}
