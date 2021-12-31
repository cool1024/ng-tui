import { Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { Item } from '../../tui-core/interface/item.interface';
import { ConfigService } from '../../tui-core/service/config.service';
import { Pagination } from './pagination.class';

@Component({
  selector: 'ts-pagination',
  templateUrl: './pagination.html',
})
export class PaginationComponent extends ThemeDirective implements DoCheck {
  @Input() pagination: Pagination;

  @Input() btnNum: number;

  @Input() items: Item[];

  @Input() goTitle: string;

  @Output() pageChange = new EventEmitter<Pagination>();

  pages!: number[];

  getLimitText: (limit: number) => string;

  constructor(configService: ConfigService) {
    super();

    this.goTitle = '';

    this.btnNum = 5;

    this.pagination = new Pagination();

    this.color = configService.config.defaultColor;
    this.items = configService.config.paginationItems as any;

    this.getLimitText = configService.config.paginationLimitTextFormat as any;
  }

  ngDoCheck(): void {
    this.setPages();
  }

  prevPage(): void {
    if (this.pagination.hasPrev()) {
      this.pagination.page--;
      this.sendChange();
    }
  }

  nextPage(): void {
    if (this.pagination.hasNext()) {
      this.pagination.page++;
      this.sendChange();
    }
  }

  startPage(): void {
    if (this.pagination.hasPrev()) {
      this.pagination.page = 1;
      this.sendChange();
    }
  }

  endPage(): void {
    if (this.pagination.hasNext()) {
      this.pagination.page = this.pagination.maxPage;
      this.sendChange();
    }
  }

  changeLimit(limit: number): void {
    this.pagination.limit = limit;
    this.setPages();
    this.pageChange.emit(this.pagination);
  }

  sendChange(page?: number): void {
    if (page && this.pagination.hasPage(page)) {
      this.pagination.page = page;
      this.setPages();
      this.pageChange.emit(this.pagination);
    } else {
      this.pageChange.emit(this.pagination);
    }
  }

  setPages(): void {
    if (!this.pagination.pageValid()) {
      this.pagination.page = 1;
    }
    this.pages = [];
    const pagination = this.pagination.clone();
    let right = 0;
    let left = 0;
    const maxLeftNum = pagination.page - 1;
    let maxRightNum = pagination.maxPage - pagination.page;
    maxRightNum = maxRightNum > 0 ? maxRightNum : 0;
    const expLeftNum = Math.ceil((this.btnNum - 1) / 2);
    const expRightNum = this.btnNum - expLeftNum - 1;
    if (maxLeftNum >= expLeftNum) {
      if (maxRightNum >= expRightNum) {
        left = expLeftNum;
        right = expRightNum;
      } else {
        right = maxRightNum;
        left =
          maxLeftNum > this.btnNum - right - 1
            ? this.btnNum - right - 1
            : maxLeftNum;
      }
    } else {
      if (maxRightNum >= expRightNum) {
        left = maxLeftNum;
        right =
          maxRightNum > this.btnNum - left - 1
            ? this.btnNum - left - 1
            : maxRightNum;
      } else {
        left = maxLeftNum;
        right = maxRightNum;
      }
    }

    for (let i = 0; i < left; i++) {
      this.pages.push(pagination.page - left + i);
    }
    this.pages.push(pagination.page);
    for (let i = 0; i < right; i++) {
      this.pages.push(pagination.page + i + 1);
    }
  }
}
