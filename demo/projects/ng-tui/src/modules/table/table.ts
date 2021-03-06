import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../pagination/pagination.class';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'thead',
    templateUrl: './header.html'
})
export class TableHeaderComponent {
    @Input() theads: Array<TableHeader | String> = [];
}

@Component({
    selector: 'ts-table',
    exportAs: 'tsTable',
    templateUrl: './table.html'
})
export class TableComponent extends BaseTheme implements OnInit {

    @Input() colNum: number = 0;
    @Input() height: number = 400;
    @Input() emptyTitle: String;
    @Input() goTitle: String;
    @Input() loader: (page: Pagination, search: SearchParams) => Observable<{ data: Array<any>, total: number, result: boolean }>;
    @Input() data: Array<any> = [];
    @Input() params: SearchParams = SearchParams.createDefaultSearch();
    @Input() page: Pagination = new Pagination();
    @Input() auto = true;

    get search() { return this.params.params; }
    private searchParams = SearchParams.createDefaultSearch();

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
        this.emptyTitle = configService.config.tableConfig.emptyTitle;
        this.goTitle = configService.config.tableConfig.goTitle;
    }

    ngOnInit() {
        this.auto && this.doRefresh();
    }

    doSearch() {
        this.searchParams.update(this.params.values);
        this.doRefresh();
    }

    doRefresh() {
        this.page.loading = true;
        this.loader(this.page, this.params).subscribe(res => {
            if (res.result) {
                this.page.total = res.total;
                this.data = res.data;
            }
            this.page.loading = false;
        });
    }

    doReset() {
        this.params.clean();
        this.searchParams.clean();
        this.doRefresh();
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

    constructor(public params: { [key: string]: string | number | any }, private emptyValues: Array<any>) { }

    get values(): { [key: string]: string | number } {
        const params: { [key: string]: string | number } = {};
        for (const key in this.params) {
            if (!this.isEmptyValue(this.params[key])) {
                params[key] = this.params[key];
            }
        }
        return params;
    }

    public static createDefaultSearch(params: { [key: string]: any } = {}): SearchParams {
        return new SearchParams(params, [0, '', null, undefined]);
    }

    isEmptyKey(key: string) {
        return this.isEmptyValue(this.params[key]);
    }

    isEmptyValue(value: any) {
        return this.emptyValues.findIndex(e => e === value) >= 0;
    }

    setEmpty(key: string) {
        const index = this.emptyValues.findIndex(e => typeof e === typeof this.params[key]);
        if (index >= 0) {
            this.params[key] = this.emptyValues[index];
        }
    }

    clean() {
        for (const key in this.params) {
            this.setEmpty(key);
        }
    }

    update(params: { [key: string]: any }) {
        Object.assign(this.params, params);
    }
}
