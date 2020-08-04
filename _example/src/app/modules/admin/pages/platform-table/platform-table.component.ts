import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, ConfirmService, ToastService } from 'ng-tui';
import { ApiData, SearchParams } from '../../../../cores/classes';
import { GlobalService } from '../../../../cores/services';
import { PlatformService } from '../../services/platform.service';
import { PlatformManager } from './../../interfaces/platform.interfaces';
import { skipWhile, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-platform-table',
    templateUrl: './platform-table.component.html',
    styleUrls: ['./platform-table.component.scss']
})
export class PlatformTableComponent implements OnInit {

    theads = ['#', '平台账号', '管理员名称', '负责人电话', '创建时间', '状态', '操作'];

    search = new SearchParams({ start: '', end: '' });

    list = new Array<PlatformManager>();

    pagination = new Pagination();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public global: GlobalService,
        private confirm: ConfirmService,
        private platformService: PlatformService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        this.activatedRoute.url
            .pipe(skipWhile(() => this.router.url !== '/admin/platform'))
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
        this.pagination.loading = true;
        this.platformService.searchPlatformManager(this.pagination, this.search).subscribe({
            next: res => {
                this.pagination.total = res.datas.total;
                this.list = res.datas.rows;
            },
            complete: () => this.pagination.loading = false
        });
    }

    confirmDelete(platformManager: PlatformManager) {
        this.confirm.danger('删除确认', `您确认删除管理员'${platformManager.platformManagerName}'吗？`)
            .pipe(switchMap<void, ApiData>(() => this.platformService.deletePlatformManager(platformManager.id)))
            .subscribe(() => {
                this.list.splice(this.list.indexOf(platformManager), 1);
                this.toast.success('删除成功', `成功删除管理员'${platformManager.platformManagerName}`);
                this.loadDatas();
            });
    }
}
