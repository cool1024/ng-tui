/**
 * 请编写服务文件说明
 *
 * @author 填写作者
 * @file   platform.service.ts
 * @date   2019-1-4 09:22:58
 */
import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';


@Injectable()
export class PlatformService {

    constructor(private request: RequestService) { }

    /**
     * 删除指定公司
     * @param id 公司唯一编号
     */
    deleteCompany(id: number): Observable<ApiData> {
        return this.request.delete('', { companyId: id });
    }

    /**
     * 搜索公司列表
     * @param params 查询参数
     */
    searchCompany(params: Object): Observable<ApiData> {
        return this.request.get('', params);
    }

    /**
     * 更新公司信息
     * @param company 公司信息
     */
    updateCompany(company: Object): Observable<ApiData> {
        return this.request.put('', company);
    }

    uploadCompanyLogo(file: File) {
        return this.request.ossUpload('/managerapi/avatar/access', file);
    }
}
