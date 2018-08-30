import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    OnChanges,
    AfterViewInit,
    ElementRef,
    forwardRef,
    SimpleChanges,
} from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { DropdownDirective } from '../dropdown/dropdown.directive';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: '*[tsSelects]',
    template: `
    <div tsDropdown  #tsDropdown="tsDropdown" (displayChange)="cleanSearch()" class="w-100" [useItemClickClose]="false">
        <div tsToggle
            [class.d-none]="isDisabled"
            [class.p-0]="activeItems.length>0"
            [class.p-2]="activeItems.length<=0"
            class="w-100">
            <span class="text-muted" *ngIf="activeItems.length<=0">{{placeholder}}</span>
            <span class="badge p-2 m-1 no-select badge-{{color}}" *ngFor="let active of activeItems">
                <i (click)="setValue(active)" class="iconfont icon-delete"></i>
                {{active.text}}
            </span>
        </div>
        <div *ngIf="isDisabled"
            [class.p-0]="activeItems.length>0"
            [class.p-2]="activeItems.length<=0"
            class="w-100 selects-disabled">
            <span class="text-muted" *ngIf="activeItems.length<=0">{{placeholder}}</span>
            <span class="badge p-2 m-1 no-select badge-{{color}}" *ngFor="let active of activeItems">
                <i class="iconfont icon-delete"></i>
                {{active.text}}
            </span>
        </div>
        <div tsDropMenu [style.width]="'100%'">
            <div class="w-100 ts-select-item">
                <div class="pl-2 pb-2 pr-2">
                    <input [(ngModel)]="searchKey" [placeholder]="searchLabel" class="form-control" type="text">
                </div>
                <p class="text-center" *ngIf="searchItems.length<=0">{{emptyLabel}}</p>
                <div *ngFor="let item of searchItems"
                    (click)="setValue(item)"
                    class="dropdown-item pointer no-select text-{{isActiveItem(item)&&color}}">
                    <div class="d-table w-100">
                        <div class="d-table-cell" [innerHTML]="item.content||item.text"></div>
                        <div class="d-table-cell text-right" *ngIf="isActiveItem(item)">
                            <i class="iconfont icon-check"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    styles: [
        `.ts-select-item {
            max-height: 270px;
            overflow-y: auto;
        }
        .dropdown-item.active,
        .dropdown-item:active{
            color: #343a40 !important;
            background: #f8f9fa !important;
        }
        .dropdown-item:after{
            text-align:center;
        }`
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectsComponent),
        multi: true
    }]
})
export class SelectsComponent extends BaseForm implements AfterViewInit, OnChanges, ControlValueAccessor {

    @Input() items: Array<Item>;

    @Input() placeholder: string;

    @Input() emptyLabel: string;

    @Input() searchLabel: string;

    @Input() lg: string;

    @Input() sm: string;

    @Input() color: string;

    @Output() optionChange = new EventEmitter<any>(false);

    @ViewChild('tsDropdown') dropdown: DropdownDirective;

    title: string;
    searchKey: string;
    activeItems: Array<Item>;
    isDisabled: boolean;
    private changeInside: boolean;
    private values: any[];

    constructor(private elementRef: ElementRef) {
        super();
        this.placeholder = 'Select...';
        this.searchKey = '';
        this.title = '';
        this.items = [];
        this.values = [];
        this.activeItems = [];
        this.emptyLabel = 'No results found.';
        this.searchLabel = 'Search...';
        this.changeInside = false;
        this.isDisabled = false;
    }

    get searchItems(): Item[] {
        let items = this.items;
        if (this.searchKey) {
            items = items.filter(e => e.text.indexOf(this.searchKey) > -1);
        }
        return items;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.changeInside) {
            this.changeInside = false;
        }
        this.activeItems = [];
        this.values.forEach(value => {
            const temp = this.items.find(item => item.value === value);
            if (temp !== undefined) {
                this.activeItems.push(temp);
            }
        });
    }

    ngAfterViewInit() {
        const dom: HTMLElement = this.elementRef.nativeElement;
        dom.classList.add('form-control', 'p-0', 'pointer');
        if (this.isApply(this.sm)) {
            dom.classList.add('form-control-sm');
        }
        if (this.isApply(this.lg)) {
            dom.classList.add('form-control-lg');
        }
    }

    writeValue(values: any) {
        if (values === null || values === undefined) {
            values = [];
        }
        this.values = values;
        if (this.changeInside) {
            this.changeInside = false;
        }
        this.activeItems = [];
        this.values.forEach(value => {
            const temp = this.items.find(item => item.value === value);
            if (temp !== undefined) {
                this.activeItems.push(temp);
            }
        });
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
        const dom: HTMLElement = this.elementRef.nativeElement;
        if (dom) {
            return isDisabled ? dom.classList.add('disabled') : dom.classList.remove('disabled');
        }
    }

    cleanSearch() {
        this.searchKey = '';
    }

    setValue(item: Item) {
        const index = this.activeItems.indexOf(item);
        if (index < 0) {
            this.activeItems.push(item);
        } else {
            this.activeItems.splice(index, 1);
        }
        this.values = this.activeItems.map<Item>(element => element.value);
        this.changeHandle(this.values);
        this.optionChange.emit(this.activeItems);
        setTimeout(() => {
            if (!this.dropdown.isClose()) {
                this.dropdown.present();
            }
        });

    }

    isActiveItem(item: Item): boolean {
        return this.activeItems.indexOf(item) >= 0;
    }

    isApply(value: any): boolean {
        return !!value || (value !== undefined && value.toString() === '');
    }
}
