import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Util } from '../../tui-core/util';
import { MenuItem } from './node.interface';

@Component({
    selector: 'ts-items-group',
    templateUrl: './items-group.html'
})
export class ItemsGroupComponent implements OnInit {

    @Input() hoverStyle: { [key: string]: [string, string, string] } = {};
    @Input() nodes!: MenuItem[];
    @Output() itemChange = new EventEmitter<MenuItem>(false);


    showNodes!: MenuItem[][];
    activeNodes!: MenuItem[];

    private parentDom!: HTMLElement;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.showNodes = [this.nodes];
        this.activeNodes = [];
        this.parentDom = (this.elementRef.nativeElement as HTMLElement).parentElement as any;
        this.parentDom.addEventListener('mouseenter', () => { })
    }

    isActiveItem(node: MenuItem) {
        return !!~this.activeNodes.indexOf(node);
    }

    updateShowNodes(level: number, activeNode: MenuItem) {
        this.showNodes.splice(level + 1);
        this.activeNodes.splice(level + 1);
        this.activeNodes[level] = activeNode;
        if (Util.notNullAndEmpty(activeNode.children!)) {
            this.showNodes[level + 1] = activeNode.children as any;
        }
    }

    closeMenu(activeNode: MenuItem) {
        this.activeNodes = [];
        this.showNodes = [this.nodes];
        this.itemChange.emit(activeNode);
    }
}