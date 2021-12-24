import {
    Input,
    Output,
    EventEmitter,
    forwardRef,
    Component,
    OnChanges,
    SimpleChanges,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemTree } from './item-tree.interface';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-select-block',
    templateUrl: 'select-block.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectBlockComponent),
            multi: true,
        },
    ],
})
export class SelectBlockComponent extends FormDirective implements OnChanges, AfterViewInit {
    title = '';

    values: Array<any> = [];

    optionsQuery = new Array<ItemTree[]>();

    activeOptions = new Array<ItemTree>();

    isOpen = false;

    @Input() color: string;

    @Input() placeholder = '';

    @Input() options!: ItemTree[];

    @Output() optionChange = new EventEmitter<ItemTree[]>(false);

    constructor(private elementRef: ElementRef, configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor as any;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.options = changes.options.currentValue;
        this.writeValue(this.values || []);
    }

    ngAfterViewInit(): void {
        const div: HTMLElement = this.elementRef.nativeElement;
        div.classList.add('custom-select', `custom-select-${this.getSize}`);
    }

    writeValue(values: Array<any>): void {
        if (Array.isArray(values)) {
            this.values = values;
            this.optionsQuery = [this.options];
            this.activeOptions = [];
            this.values.forEach((value, i) => {
                if (!this.optionsQuery[i]) {
                    return;
                }
                this.activeOptions[i] = this.optionsQuery[i].find((option) => option.value === value) as any;
                // tslint:disable-next-line:no-unused-expression
                this.activeOptions[i] && (this.optionsQuery[i + 1] = this.activeOptions[i].children as any);
            });
            this.title = this.activeOptions.map((option) => (option ? option.text : '')).join(' / ');
        }
    }

    showSelectBlock(target: any): void {
        if (!this.isOpen) {
            setTimeout(() => {
                target.onClick();
            });
        }
    }

    showChildren(i: number, node: ItemTree, target: any): void {
        this.optionsQuery.splice(i + 1);
        this.activeOptions.splice(i + 1);
        this.activeOptions[i] = node;
        if (!!node.children) {
            this.optionsQuery[i + 1] = node.children;
        } else {
            this.values = this.activeOptions.map((option) => option.value);
            this.title = this.activeOptions.map((option) => option.text).join(' / ');
            this.optionChange.emit(this.activeOptions);
            // tslint:disable-next-line:no-unused-expression
            this.changeHandle && this.changeHandle(this.values);
        }
    }

    isActiveOption(node: ItemTree): boolean {
        return !!~this.activeOptions.indexOf(node);
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value.toString() === '');
    }
}
