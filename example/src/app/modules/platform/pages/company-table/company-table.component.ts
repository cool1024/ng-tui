/**
 * 公司列表
 *
 * @author cool1024
 * @file   company-table.component.ts
 * @date   2019-1-4 09:26:17
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParams, ApiData } from 'src/app/cores/classes';
import { Pagination, ConfirmService, ToastService } from 'ng-tui';
import { Company } from '../../interfaces/company.interface';
import { switchMap, skipWhile } from 'rxjs/operators';
import { PlatformService } from '../../services/platform.service';

@Component({
    templateUrl: './company-table.component.html',
    styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

    search = new SearchParams();
    page = new Pagination();
    tableHeads = ['#', '图标', '公司名称', '应用数（可用/全部）', '创建日期', '公司状态', '操作'];
    tableRows: Array<Company> = [
        {
            id: 1, isActive: 1,
            companyName: '测试公司', comapnyLogo: '', companyServiceTotal: 10, companyServiceActiveTotal: 1, createdAt: '2018-06-07 08:50:41'
        }
    ];

    constructor(
        private confirm: ConfirmService,
        private platform: PlatformService,
        private toast: ToastService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        // 如果进入了本页面那么重新加载页面数据（只用于需要每次刷新的列表）
        this.activatedRoute.url
            .pipe(skipWhile(() => this.router.url !== '/platform/company'))
            .subscribe(() => this.loadDatas());
    }

    /**
     * 加载列表数据
     */
    loadDatas() {
        this.page.loading = true;
        this.platform.searchCompany(this.page.getPageDataWith(this.search.values)).subscribe({
            next: res => {
                this.page.total = res.datas.total;
                this.tableRows = res.datas.rows;
            },
            complete: () => {
                this.page.loading = false;
                console.log(111);
            }
        });
    }

    /**
     * 确认删除公司
     * @param company 公司
     */
    confirmDelete(company: Company) {
        this.confirm.danger('删除确认', `您确认删除公司'${company.companyName}'吗？`)
            .pipe(switchMap<void, ApiData>(() => this.platform.deleteCompany(company.id)))
            .subscribe(() => {
                this.tableRows.splice(this.tableRows.indexOf(company), 1);
                this.toast.success('删除成功', `成功删除公司'${company.companyName}`);
                this.loadDatas();
            });
    }

    /**
     * 启用/禁用公司状态
     * @param company 公司
     * @param isActive 状态
     */
    updateCompanyStatus(company: Company, isActive: number) {
        this.platform.updateCompany({ id: company.id, isActive }).subscribe(() => {
            this.toast.success('操作成功', `成功${isActive ? '启用' : '禁用'}公司'${company.companyName}`);
        });
    }
}
