import {
    Input,
    Output,
    EventEmitter,
    forwardRef,
    AfterViewInit,
    Component,
    OnChanges,
} from '@angular/core';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemTree } from './item-tree.interface';

@Component({
    selector: 'ts-select-block',
    templateUrl: 'select-block.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectBlockComponent),
        multi: true
    }]
})
export class SelectBlockComponent extends BaseForm implements AfterViewInit, OnChanges {

    title = '';

    values: Array<any> = [];

    optionsQuery = new Array<ItemTree[]>();

    activeOptions = new Array<ItemTree>();

    isOpen = false;

    @Input() placeholder = '';

    @Input() items: ItemTree[];

    @Input() lg: string;

    @Input() sm: string;

    @Output() optionChange = new EventEmitter<ItemTree[]>(false);

    ngAfterViewInit() {

    }

    ngOnChanges() {
        this.optionsQuery[0] = this.items;
    }

    writeValue(values: Array<any>) {
        if (Array.isArray(values)) {
            this.values = values;
            this.optionsQuery = [this.items];
            this.activeOptions = [];
            this.values.forEach((value, i) => {
                this.activeOptions[i] = this.optionsQuery[i].find(option => option.value === value);
                // tslint:disable-next-line:no-unused-expression
                this.activeOptions[i] && (this.optionsQuery[i + 1] = this.activeOptions[i].children);
            });
            this.title = this.activeOptions.map(option => option.text).join(' / ');
        }
    }

    showSelectBlock(target: any) {
        if (!this.isOpen) {
            setTimeout(() => {
                target.onClick();
            });
        }
    }

    showChildren(i: number, node: ItemTree, target: any) {
        this.optionsQuery.splice(i + 1);
        this.activeOptions.splice(i + 1);
        this.activeOptions[i] = node;
        if (!!node.children) {
            this.optionsQuery[i + 1] = node.children;
        } else {
            this.values = this.activeOptions.map(option => option.value);
            this.title = this.activeOptions.map(option => option.text).join(' / ');
            this.optionChange.emit(this.activeOptions);
            // tslint:disable-next-line:no-unused-expression
            this.changeHandle && this.changeHandle(this.values);
        }
    }

    isActiveOption(node: ItemTree) {
        // tslint:disable-next-line:no-bitwise
        return ~this.activeOptions.indexOf(node);
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value.toString() === '');
    }
}
