import { Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { Pagination } from './pagination.class';
import { Item } from '../../tui-core/interfaces/item.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-pagination',
    template: `<div class="d-inline-block">
    <ng-container *ngIf="goTitle">
        <button (click)="page.invalid||sendChange(page.value)" [class]="btnClass">{{goTitle}}</button>
        <input ngModel #page="ngModel" [min]="1" [class.form-control-sm]="isApply(sm)"
        [class.form-control-lg]="isApply(lg)"
            class="form-control pagination-input form-sm-control border-muted ml-1 mr-1" type="number">
    </ng-container>
    <ts-dropdown *ngIf="items" dropup [lg]="lg" [sm]="sm" [color]="color" [outline]="outline"
    [value]="pagination.limit" [items]="items" (valueChange)="changeLimit($event)" class="mr-1"></ts-dropdown>
    <div class="btn-group mr-2" role="group">
        <button type="button" [class]="btnClass" *ngIf="!!startTitle" [class.disabled]="!pagination.hasPrev()"
        [disabled]="!pagination.hasPrev()"
            (click)="pagination.page=1;sendChange()">{{startTitle}}</button>
        <button type="button" [class]="btnClass" *ngIf="!!prevTitle" [class.disabled]="!pagination.hasPrev()"
        [disabled]="!pagination.hasPrev()"
            (click)="pagination.page=pagination.page-1;sendChange()">{{prevTitle}}</button>
        <ng-template ngFor let-item [ngForOf]="pages" let-i="index">
            <button [ngClass]="{'active':item == pagination.page}" type="button" [class]="btnClass"
            (click)="pagination.page=item;sendChange()">{{item}}</button>
        </ng-template>
        <button type="button" [class]="btnClass" *ngIf="!!nextTitle" [class.disabled]="!pagination.hasNext()"
        [disabled]="!pagination.hasNext()"
            (click)="pagination.page=pagination.page+1;sendChange()">{{nextTitle}}</button>
        <button type="button" [class]="btnClass" *ngIf="!!endTitle" [class.disabled]="!pagination.hasNext()"
        [disabled]="!pagination.hasNext()"
            (click)="pagination.page=pagination.maxPage;sendChange()">{{endTitle}}</button>
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
