import { Component, Input, Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'thead',
    templateUrl: './header.html'
})
export class TableHeaderComponent {
    @Input() theads: Array<TableHeader | String> = [];
}

@Directive({
    selector: 'tsTable',
    exportAs: 'tsTable'
})
export class TableComponent {
    @Input() loader: Observable<Array<any>>;
    data: Array<any> = [];

    refreshTable(params: SearchParams) {

    }
}

export interface TableHeader {
    title: string;
    sort?: boolean;
    minWidth?: number;
    maxWidth?: number;
    slot?: string;
}

export class SearchParams {

    constructor(public params: { [key: string]: string | number | any } = {}, private emptyValues = []) { }

    get values(): { [key: string]: string | number } {
        const params: { [key: string]: string | number } = {};
        for (const key in this.params) {
            if (!this.isEmptyValue(this.params[key])) {
                params[key] = this.params[key];

            }
        }
        return params;
    }

    public static createDefaultSearch(params: { [key: string]: any }): SearchParams {
        return new SearchParams(params, [0, '']);
    }

    isEmptyValue(value: any) {
        return this.emptyValues.findIndex(e => e === value);
    }

    setEmpty(key: string) {
        const index = this.emptyValues.findIndex(e => typeof e === typeof this.params[key]);
        if (index >= 0) {
            this.params[key] = this.emptyValues[index];
        }
    }

    clean() {
        for (const key in this.params) {
            this.setEmpty[key];
        }
    }

    update(params: { [key: string]: any }) {
        Object.assign(this.params, params);
    }
}
