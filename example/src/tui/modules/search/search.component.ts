import {
    Component,
    Input,
    ViewChild,
    AfterViewInit,
    ElementRef,
    forwardRef,
    OnInit,
} from '@angular/core';
import { Item } from './../../commons/interfaces/item.interface';
import { DomAttr } from '../../commons/extends/attr.class';
import { DropdownDirective } from '../dropdown/dropdown.directive';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: '*[tsSearch]',
    template: `
    <div tsDropdown  #tsDropdown="tsDropdown" (displayChange)="cleanSearch()" class="w-100" [useItemClickClose]="false">
        <div tsToggle
            [class.p-0]="activeItems.length>0"
            [class.p-2]="activeItems.length<=0"
            class="pointer w-100">
            <span class="text-muted" *ngIf="activeItems.length<=0">{{placeholder}}</span>
            <span class="badge p-2 m-1 no-select {{badgeClass}}" *ngFor="let active of activeItems">
                <i (click)="setValue(active)" class="fa fa-fw fa-close"></i>
                {{active.text}}
            </span>
        </div>
        <div tsDropMenu [style.width]="'100%'">
            <div class="w-100 ts-select-item">
                <div class="pl-2 pb-2 pr-2">
                    <input #searchBox
                        (keyup)="doSearch(searchBox.value)"
                        [placeholder]="searchLabel"
                        class="form-control" type="text">
               </div>
                <div *ngFor="let item of items$ | async"
                    (click)="setValue(item)"
                    class="dropdown-item pointer no-select {{isActiveItem(item)?textClass:''}}">
                    <div class="d-table w-100">
                        <div class="d-table-cell" [innerHTML]="item.content||item.text"></div>
                        <div class="d-table-cell text-right" *ngIf="isActiveItem(item)">
                            <i class="fa fa-fw fa-check"></i>
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
        useExisting: forwardRef(() => SearchComponent),
        multi: true
    }]
})
export class SearchComponent extends DomAttr implements OnInit, AfterViewInit, ControlValueAccessor {

    @Input() search: (key: string) => Observable<Item[]>;
    @Input() placeholder: string;
    @Input() emptyLabel: string;
    @Input() searchLabel: string;

    @ViewChild('tsDropdown') dropdown: DropdownDirective;
    @ViewChild('searchBox') input: ElementRef;

    items$: Observable<Item[]>;
    title = '';
    activeItems: Array<Item> = [];
    private changeInside = false;
    private subject = new Subject<string>();
    applyChange = (value: any) => { };

    constructor(private elementRef: ElementRef) {
        super();
        this.placeholder = 'Select...';
        this.emptyLabel = 'No results found.';
        this.searchLabel = 'Search...';
    }

    ngOnInit() {
        this.items$ = this.subject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap<string, Item[]>(key => this.search(key))
        );
    }

    ngAfterViewInit() {
        const dom: HTMLElement = this.elementRef.nativeElement;
        dom.classList.add('form-control', 'p-0');
        if (this.sm !== null) {
            dom.classList.add('form-control-sm');
        }
        if (this.lg !== null) {
            dom.classList.add('form-control-lg');
        }
    }

    /**
     * 搜索方法
     * @param key 查询关键词
     */
    doSearch(key: string) {
        if (key.trim()) {
            this.subject.next(key);
        }
    }


    writeValue(values: any) {
        if (values === null || values === undefined) {
            values = [];
        }
        this.activeItems = values;
    }

    registerOnChange(fn: any) { this.applyChange = fn; }

    registerOnTouched(fn: any) { this.applyChange = fn; }

    cleanSearch() {
        console.log(this.input);
        this.input.nativeElement.value = '';
    }

    setValue(item: Item) {
        const index = this.activeItems.findIndex(e => e.value === item.value);
        if (index < 0) {
            this.activeItems.push(item);
        } else {
            this.activeItems.splice(index, 1);
        }
        this.applyChange(this.activeItems);
        setTimeout(() => {
            if (!this.dropdown.isClose()) {
                this.dropdown.present();
            }
        });
    }

    isActiveItem(item: Item): boolean {
        return this.activeItems.findIndex(e => e.value === item.value) >= 0;
    }
}
