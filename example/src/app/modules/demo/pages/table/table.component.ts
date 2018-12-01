import { Component, OnInit } from '@angular/core';
import { Pagination } from 'ng-tui';
import { GlobalService, RequestService } from '../../../../cores/services';
import { SearchParams } from '../../../../cores/classes';

@Component({
    templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {

    // 表格数据
    list = new Array<any>();

    // 表格标题
    theads = new Array<string>();

    // 分页参数
    pagination = new Pagination();

    // 查询参数
    search = new SearchParams({ start: '', end: '' });

    constructor(
        private reqeust: RequestService,
        public global: GlobalService) { }

    ngOnInit() {
        this.theads = ['No.', '会员', '联系电话 | 住址', '注册日期', '操作'];
        this.pageChanged();
    }

    pageChanged() {
        this.pagination.loading = true;
        const apiUrl = `https://randomuser.me/api/?page=${this.pagination.page}&results=${this.pagination.limit}`;
        this.reqeust.withoutHost.text(apiUrl).subscribe({
            next: res => {
                const response = JSON.parse(res);
                this.list = new Array<any>();
                this.pagination.total = 1000;
                response.results.forEach(user => {
                    this.list.push({
                        avatar: user.picture.thumbnail,
                        nick: user.name.first,
                        email: user.email,
                        gender: user.gender,
                        cell: user.cell,
                        phone: user.phone,
                        address: `${user.location.city} ${user.location.street}`,
                        registered: user.registered
                    });
                });
            },
            complete: () => this.pagination.loading = false
        });
    }

    doReset() {
        this.pagination.reset();
        this.pageChanged();
    }

    doSearch() {
        this.pageChanged();
    }
}
