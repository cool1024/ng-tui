import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
} from '@angular/core';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Util } from '../../tui-core/util';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-selects',
    templateUrl: './selects.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectsComponent),
        multi: true
    }]
})
export class SelectsComponent extends BaseForm {

    @Input() options: Array<string | Item>;

    @Input() placeholder: string;

    @Input() emptyLabel: string;

    @Input() searchLabel: string;

    @Output() optionChange = new EventEmitter<Item[]>(false);

    searchKey: string;

    activeItems: Array<Item>;

    get items(): Item[] {
        const items = Util.formateOptions(this.options);
        return this.searchKey ? items.filter(e => e.text.indexOf(this.searchKey) > -1) : items;
    }

    get values(): any[] {
        return this.activeItems.map<Item>(element => element.value);
    }

    constructor(csf: ConfigService) {
        super();
        this.color = csf.config.defaultColor;
        this.placeholder = 'Select...';
        this.searchKey = '';
        this.options = [];
        this.activeItems = [];
        this.emptyLabel = 'No results found.';
        this.searchLabel = 'Search...';
    }

    writeValue(values: any[]) {
        if (values === null || values === undefined) {
            values = [];
        }
        const items = Util.formateOptions(this.options) || [];
        this.activeItems = items.filter(item => ~values.indexOf(item.value))
    }

    onShowMenu(event: boolean) {
        this.searchKey = '';
    }

    setValue(item: Item) {
        const index = this.activeItems.indexOf(item);
        if (index < 0) {
            this.activeItems.push(item);
        } else {
            this.activeItems.splice(index, 1);
        }
        this.changeHandle(this.values);
        this.optionChange.emit(this.activeItems);
    }

    isActiveItem(item: Item): boolean {
        return this.activeItems.indexOf(item) >= 0;
    }

    trackByValue(index: number, item: Item): number { return item.value; }
}