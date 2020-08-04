import { Component, OnInit } from '@angular/core';
import { UploadConfig, ToastService } from 'ng-tui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalService } from '../../../../cores/services';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/company.interfaces';
import { ApiData } from '../../../../cores/classes';
import { skipWhile, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

    company: Company = { id: 0, isActive: 1 };

    options: UploadConfig;

    constructor(
        public global: GlobalService,
        private active: ActivatedRoute,
        private toast: ToastService,
        private companyService: CompanyService,
    ) {
        this.options = {
            queryString: '?x-oss-process=image/resize,h_130,w_130',
            uploader: (file: File) => this.companyService.uploadCompayLogo(file)
        };
        this.active.paramMap
            .pipe(skipWhile(params => !params.has('id')), switchMap<ParamMap, ApiData>(params => {
                this.company.id = parseInt(params.get('id'), 10);
                return this.companyService.getCompany(this.company.id);
            }))
            .subscribe(res => this.company = res.datas);
    }

    ngOnInit() {
    }

    /**
     * 确认添加
     */
    confirmInsert(btn: any) {
        this.companyService.insertCompany(this.company).subscribe({
            next: res => {
                this.toast.success('添加成功', `成功添加商户${this.company.companyName}`);
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }

    /**
     * 确认修改
     */
    confirmUpdate(btn: any) {
        this.companyService.updateCompany(this.company).subscribe({
            next: res => {
                this.toast.success('修改成功', `成功修改商户${this.company.companyName}的信息`);
            },
            complete: () => {
                btn.dismiss();
            }
        });
    }
}
