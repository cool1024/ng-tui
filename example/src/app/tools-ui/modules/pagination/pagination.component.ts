import { Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { Pagination } from './pagination.class';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-pagination',
    template: `
<div class="d-inline-flex flex-wrap">
    <ng-container *ngIf="goTitle">
        <div (click)="page.invalid||sendChange(page.value)"
             class="pagination-button pagination-button-{{color}}">
             {{goTitle}}
        </div>
        <input ngModel #page="ngModel" [min]="1" class="form-control pagination-input" type="number">
    </ng-container>
    <div tsDropdown dropup class="pagination-dropdown">
        <div tsToggle class="pagination-button pagination-button-{{color}}">显示 {{pagination.limit}} 条</div>
        <div tsDropMenu class="rounded">
            <button *ngFor="let item of items" (click)="changeLimit(item.value)" class="dropdown-item">{{item.text}}</button>
        </div>
    </div>
    <div (click)="pagination.page=1;sendChange()"
            [class.disabled]="!pagination.hasPrev()"
            class="pagination-item pagination-tool-{{color}}">
        <i class="iconfont icon-start"></i>
    </div>
    <div (click)="pagination.page=pagination.page-1;sendChange()"
            [class.disabled]="!pagination.hasPrev()"
            class="pagination-item pagination-tool-{{color}}">
        <i class="iconfont icon-preview"></i>
    </div>
    <ng-template ngFor let-item [ngForOf]="pages" let-i="index">
        <div (click)="pagination.page=item;sendChange()"
            [ngClass]="{'active':item == pagination.page}"
            class="pagination-item pagination-item-{{color}}">{{item}}</div>
    </ng-template>
    <div (click)="pagination.page=pagination.page+1;sendChange()"
            [class.disabled]="!pagination.hasNext()"
            class="pagination-item pagination-tool-{{color}}">
        <i class="iconfont icon-next"></i>
    </div>
    <div (click)="pagination.page=pagination.maxPage;sendChange()"
            [class.disabled]="!pagination.hasNext()"
            class="pagination-item pagination-tool-{{color}}">
        <i class="iconfont icon-end"></i>
    </div>
</div>`
})
export class PaginationComponent extends BaseTheme implements DoCheck {

    @Input() color: string;

    @Input() nextTitle: string;

    @Input() prevTitle: string;

    @Input() endTitle: string;

    @Input() startTitle: string;

    @Input() pagination: Pagination;

    @Input() btnNum: number;

    @Input() items: Item[];

    @Input() goTitle: string;

    @Output() pageChange = new EventEmitter<Pagination>();

    pages: number[];

    constructor(private configService: ConfigService) {

        super();

        this.goTitle = '';

        this.btnNum = 5;

        this.pagination = new Pagination();

        this.color = this.configService.config.defaultColor;
    }

    ngDoCheck() { this.setPages(); }

    changeLimit(limit: number) {
        this.pagination.limit = limit;
        this.setPages();
        this.pageChange.emit(this.pagination);
    }

    sendChange(page?: number) {
        if (page && this.pagination.hasPage(page)) {
            this.pagination.page = page;
            this.setPages();
            this.pageChange.emit(this.pagination);
        } else {
            this.pageChange.emit(this.pagination);
        }
    }

    setPages() {
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
                left = maxLeftNum > (this.btnNum - right - 1) ? this.btnNum - right - 1 : maxLeftNum;
            }
        } else {
            if (maxRightNum >= expRightNum) {
                left = maxLeftNum;
                right = maxRightNum > (this.btnNum - left - 1) ? this.btnNum - left - 1 : maxRightNum;
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
