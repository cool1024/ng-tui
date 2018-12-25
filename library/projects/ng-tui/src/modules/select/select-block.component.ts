import {
    Input,
    Output,
    EventEmitter,
    forwardRef,
    Component,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemTree } from './item-tree.interface';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-select-block',
    templateUrl: 'select-block.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectBlockComponent),
        multi: true
    }]
})
export class SelectBlockComponent extends BaseForm implements OnChanges {

    title = '';

    values: Array<any> = [];

    optionsQuery = new Array<ItemTree[]>();

    activeOptions = new Array<ItemTree>();

    isOpen = false;

    @Input() color: string;

    @Input() placeholder = '';

    @Input() items: ItemTree[];

    @Input() lg: string;

    @Input() sm: string;

    @Output() optionChange = new EventEmitter<ItemTree[]>(false);

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.items = changes.items.currentValue;
        this.writeValue(this.values || []);
    }


    writeValue(values: Array<any>) {
        if (Array.isArray(values)) {
            this.values = values;
            this.optionsQuery = [this.items];
            this.activeOptions = [];
            this.values.forEach((value, i) => {
                if (!this.optionsQuery[i]) {
                    return;
                }
                this.activeOptions[i] = this.optionsQuery[i].find(option => option.value === value);
                // tslint:disable-next-line:no-unused-expression
                this.activeOptions[i] && (this.optionsQuery[i + 1] = this.activeOptions[i].children);
            });
            this.title = this.activeOptions.map(option => option ? option.text : '').join(' / ');
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
