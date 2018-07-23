import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    forwardRef,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { Item } from './../../tui-core/interfaces/item.interface';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseForm } from '../../tui-core/base-class/base-form.class';

@Component({
    selector: 'ts-select',
    template: `
    <div tsDropdown class="w-100">
        <input tsToggle
            [attr.readonly]="readonly"
            [class.custom-select-sm]="isApply(sm)"
            [class.custom-select-lg]="isApply(lg)"
            [(ngModel)]="title" (ngModelChange)="setSearchKey($event)" class="custom-select border-0 pointer" type="text"
            [placeholder]="placeholder"
            [disabled]="isDisabled">
        <div (displayChange)="setReadonlyStatus($event)" tsDropMenu [style.width]="'100%'">
            <div class="ts-select-item pointer border-none">
                <div *ngFor="let item of itemsList;trackBy: trackByValue"
                     class="dropdown-item"
                     [class.active]="item===value"
                     (click)="setValue(item)"
                     [innerHTML]="item.content||item.text">
                </div>
                <div *ngIf="itemsList.length<=0" class="text-muted text-center">{{emptyLabel}}</div>
            </div>
        </div>
    </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
    }]
})
export class SelectComponent extends BaseForm implements OnChanges, AfterViewInit {

    title: string;

    searchKey: string;

    readonly: string;

    @Input() items: Array<string | number | { value: any, text: string }>;

    @Input() placeholder: string;

    @Input() emptyLabel: string;

    @Input() lg: string;

    @Input() sm: string;

    @Output() optionChange = new EventEmitter<any>(false);


    private value: any[];

    constructor(private elementRef: ElementRef) {
        super();
        this.readonly = 'readonly';
        this.placeholder = 'select...';
        this.searchKey = '';
        this.title = '';
        this.items = [];
        this.emptyLabel = 'No results found.';
    }

    get itemsList(): Array<Item> {
        let items = this.formatItems;
        if (this.searchKey) {
            items = items.filter(e => e.text.indexOf(this.searchKey) > -1);
        }
        return items;
    }

    get formatItems(): Array<Item> {
        const items = new Array<any>();
        if (this.items.length > 0) {
            this.items.forEach(e => {
                items.push(typeof e === 'string' || typeof e === 'number' ? { value: e, text: e } : e);
            });
        }
        return items;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setTitle();
    }

    ngAfterViewInit() {
        const div: HTMLElement = this.elementRef.nativeElement;
        console.log(div.classList.add('form-control', 'p-0'));
    }

    writeValue(value: any) {
        this.value = value;
        this.setTitle();
    }

    trackByValue(index: number, item: Item): number { return item.value; }

    setReadonlyStatus(status: boolean) {
        this.readonly = status ? null : 'readonly';
        if (status === false && this.searchKey.length > 0) {
            this.setTitle();
        }
    }

    setValue(item: Item) {
        this.readonly = 'readonly';
        this.value = item.value;
        this.title = item.text;
        this.searchKey = '';
        this.optionChange.emit(item);
        this.changeHandle(this.value);
    }

    setSearchKey(value: string) {
        this.searchKey = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    setTitle() {
        const items = this.formatItems;
        if (this.value !== undefined && this.value != null) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].value === this.value) {
                    this.title = items[i].text;
                    return;
                }
            }
        }
        this.title = '';
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value.toString() === '');
    }
}
