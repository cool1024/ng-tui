/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   company-detail.component.ts
 * @date   2019-1-4 09:27:16
 */
import { Component, OnInit } from '@angular/core';
import { Company, CompanyModel } from '../../interfaces/company.interface';
import { UploadConfig, Pagination } from 'ng-tui';
import { PlatformService } from '../../services/platform.service';

@Component({
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

    company: Company = {
        id: 1,
        isActive: 1,
        companyName: '测试公司',
        comapnyLogo: '',
        companyServiceTotal: 10,
        companyServiceActiveTotal: 1,
        createdAt: '2018-06-07 08:50:41'
    };

    page = new Pagination();
    tableHeads = ['图标', '应用名称', '应用状态', '操作'];
    tableRows: Array<CompanyModel> = [
        {
            id: 1,
            appName: '微信服务',
            appThumb: 'assets/images/app/wechat.svg',
            isActive: 1
        },
        {
            id: 1,
            appName: '支付宝',
            appThumb: 'assets/images/app/alipay.svg',
            isActive: 1
        },
        {
            id: 1,
            appName: '文件管理',
            appThumb: 'assets/images/app/storage.svg',
            isActive: 1
        }
    ];

    config: UploadConfig = {
        queryString: '?x-oss-process=image/resize,h_130,w_130',
        uploader: (file: File) => this.platform.uploadCompanyLogo(file),
    };

    constructor(private platform: PlatformService) { }

    ngOnInit() {

    }
}
