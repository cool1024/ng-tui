import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';
import { Pagination } from '../pagination/pagination.class';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'thead',
  templateUrl: './header.html',
})
export class TableHeaderComponent {
  @Input() theads: Array<string> = [];
}

@Component({
  selector: 'ts-table',
  exportAs: 'tsTable',
  templateUrl: './table.html',
})
export class TableComponent extends ThemeDirective implements OnInit {
  @Input() colNum = 0;
  @Input() height = 400;
  @Input() emptyTitle = '';
  @Input() goTitle = '';
  @Input() loader!: (
    page: Pagination,
    search: SearchParams
  ) => Observable<{ data: Array<any>; total: number; result: boolean }>;
  @Input() data: Array<any> = [];
  @Input() params: SearchParams = SearchParams.createDefaultSearch();
  @Input() page: Pagination = new Pagination();
  @Input() auto = true;

  get search(): any {
    return this.params.params;
  }
  private searchParams = SearchParams.createDefaultSearch();

  constructor(configService: ConfigService) {
    super();
    this.color = configService.config.defaultColor;
    if (configService.config.tableConfig) {
      this.emptyTitle = configService.config.tableConfig.emptyTitle;
      this.goTitle = configService.config.tableConfig.goTitle;
    }
  }

  ngOnInit(): void {
    this.auto && this.doRefresh();
  }

  doSearch(): void {
    this.searchParams.update(this.params.values);
    this.doRefresh();
  }

  doLoadData(): void {
    this.page.loading = true;
    this.loader(this.page, this.params).subscribe((res) => {
      if (res.result) {
        this.page.total = res.total;
        this.data = res.data;
      }
      this.page.loading = false;
    });
  }

  doRefresh(): void {
    this.page.loading = true;
    const tmp = this.page.clone();
    tmp.page = 1;
    this.loader(tmp, this.params).subscribe((res) => {
      if (res.result) {
        this.page.clean();
        this.page.total = res.total;
        this.data = res.data;
      }
      this.page.loading = false;
    });
  }

  doReset(): void {
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
  constructor(
    public params: { [key: string]: string | number | any },
    private emptyValues: Array<any>
  ) {}

  get values(): { [key: string]: string | number } {
    const params: { [key: string]: string | number } = {};
    for (const key in this.params) {
      if (!this.isEmptyValue(this.params[key])) {
        params[key] = this.params[key];
      }
    }
    return params;
  }

  public static createDefaultSearch(
    params: { [key: string]: any } = {}
  ): SearchParams {
    return new SearchParams(params, [0, '', null, undefined]);
  }

  isEmptyKey(key: string): boolean {
    return this.isEmptyValue(this.params[key]);
  }

  isEmptyValue(value: any): boolean {
    return this.emptyValues.findIndex((e) => e === value) >= 0;
  }

  setEmpty(key: string): void {
    const index = this.emptyValues.findIndex(
      (e) => typeof e === typeof this.params[key]
    );
    if (index >= 0) {
      this.params[key] = this.emptyValues[index];
    }
  }

  clean(): void {
    // tslint:disable-next-line: forin
    for (const key in this.params) {
      this.setEmpty(key);
    }
  }

  update(params: { [key: string]: any }): void {
    Object.assign(this.params, params);
  }
}
