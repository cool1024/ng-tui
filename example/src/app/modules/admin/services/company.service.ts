import { Injectable } from '@angular/core';
import { RequestService } from '../../../cores/services/request.service';
import { ApiData } from '../../../cores/classes/api-data.class';
import { SearchParams } from '../../../cores/classes/search-params';
import { Company } from '../interfaces/company.interfaces';
import { Observable } from 'rxjs';
import { Pagination } from 'ng-tui';

@Injectable()
export class CompanyService {

    constructor(private request: RequestService) { }

    /**
     * 查询商户，分页（公司）
     */
    searchCompany(pagination: Pagination, search: SearchParams): Observable<ApiData> {
        return this.request.get('/admin/company/search', pagination.getpageDataWith(search.values));
    }
    /**
    * 获取指定商户（公司）
    */
    getCompany(companyId: number): Observable<ApiData> {
        return this.request.get('/admin/company/get', { companyId });
    }

    /**
     * 请求添加新商户（公司）
     */
    insertCompany(company: Company): Observable<ApiData> {
        return this.request.post('/admin/company/insert', company);
    }

    /**
     * 更新商户信息（公司）
     */
    updateCompany(company: Company): Observable<ApiData> {
        return this.request.put('/admin/company/update', company);
    }

    /**
     * 删除商户信息（公司）
     */
    deleteCompany(companyId: number): Observable<ApiData> {
        return this.request.delete('/admin/company/delete', { companyId });
    }

    /**
     * 上传商户图片
     */
    uploadCompayLogo(file: File): Observable<string> {
        return this.request.ossUpload('/admin/company/image/access', file);
    }
}
