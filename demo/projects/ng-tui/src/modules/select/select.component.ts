import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    forwardRef,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ts-select',
    template: `
    <div class="w-100">
        <input tsToggle
            [target]="menuView" [bind]="menuView"
            [attr.readonly]="readonly"
            [(ngModel)]="title" (ngModelChange)="setSearchKey($event)"
            class="custom-select custom-select-{{getSize}} border-0 pointer" type="text"
            [placeholder]="placeholder"
            [disabled]="isDisabled">
        <div (displayChange)="setReadonlyStatus($event)"
            #menuView="tsView"
            tsView="fadeIn"
            autoSize position="auto"
            [offsetY]="1"
            class="dropdown-menu">
            <div class="ts-select-item pointer border-none">
                <div *ngFor="let item of optionsList;trackBy: trackByValue"
                     close
                     class="dropdown-item {{item.value===value&&bgWithTextClass}}"
                     [class.active]="item.value===value"
                     (click)="setValue(item)"
                     [innerHTML]="item.content||item.text">
                </div>
                <div *ngIf="optionsList.length<=0" class="text-muted text-center">{{emptyLabel}}</div>
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

    value: any;

    subject = new Subject<string>();

    @Input() options: Array<string | Item>;

    @Input() placeholder: string;

    @Input() emptyLabel: string;

    @Input() searchFunc: (key: string) => Observable<Item[]>;

    @Output() optionChange = new EventEmitter<any>(false);

    constructor(private elementRef: ElementRef, csf: ConfigService) {
        super();
        this.color = csf.config.defaultColor;
        this.readonly = 'readonly';
        this.placeholder = 'select...';
        this.searchKey = '';
        this.title = '';
        this.options = [];
        this.emptyLabel = 'No results found.';
        this.subject.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(key => {
            return this.searchFunc && this.searchFunc(key).subscribe(options => {
                this.options = options;
            });
        });
    }

    get optionsList(): Array<Item> {
        let options = this.formatoptions;
        if (this.searchKey && !this.searchFunc) {
            options = options.filter(e => e.text.indexOf(this.searchKey) > -1);
        }
        return options;
    }

    get formatoptions(): Array<Item> {
        const options = new Array<any>();
        if (this.options.length > 0) {
            this.options.forEach(e => {
                options.push(typeof e === 'string' || typeof e === 'number' ? { value: e, text: e } : e);
            });
        }
        return options;
    }

    ngOnChanges() {
        this.setTitle();
    }

    ngAfterViewInit() {
        const div: HTMLElement = this.elementRef.nativeElement;
        div.classList.add('form-control', 'p-0');
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
            this.searchKey = '';
        }
    }

    setValue(item: Item) {
        this.readonly = 'readonly';
        this.value = item.value;
        this.title = item.text;
        this.searchKey = '';
        this.optionChange.emit(item);
        // tslint:disable-next-line:no-unused-expression
        this.changeHandle && this.changeHandle(this.value);
    }

    setSearchKey(value: string) {
        this.searchKey = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        this.subject.next(this.searchKey);
    }

    setTitle() {
        const options = this.formatoptions;
        if (this.value !== undefined && this.value != null) {
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === this.value) {
                    this.title = options[i].text;
                    return;
                }
            }
        }
        this.title = '';
    }
}
