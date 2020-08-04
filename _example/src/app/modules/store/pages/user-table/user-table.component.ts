import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, ConfirmService, ToastService } from 'ng-tui';
import { SearchParams } from '../../../../cores/classes';
import { GlobalService } from '../../../../cores/services';
import { UserService } from '../../services/user.service';
import { User } from './../../interfaces/user.interface';
import { skipWhile } from 'rxjs/operators';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

    theads = ['#', '用户', '等级', '积分/余额', '联系方式', '创建时间', '操作'];

    search = new SearchParams({ start: '', end: '' });

    list = new Array<User>();

    loading = false;

    pagination = new Pagination();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public global: GlobalService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.activatedRoute.url
            .pipe(skipWhile(() => this.router.url !== '/store/user'))
            .subscribe(() => this.loadDatas());
    }

    doSearch() {
        this.pagination.reset();
        this.loadDatas();
    }

    doReset() {
        this.search.clean();
        this.doSearch();
    }

    loadDatas() {
        this.loading = true;
        this.userService.searchUser(this.pagination, this.search).subscribe({
            next: res => {
                this.pagination.total = res.datas.total;
                this.list = res.datas.rows;
            },
            complete: () => this.loading = false
        });
    }
}
