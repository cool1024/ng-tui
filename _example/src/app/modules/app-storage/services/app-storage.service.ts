/**
 * 请编写服务文件说明
 *
 * @author 填写作者
 * @file   app-storage.service.ts
 * @date   2019-1-4 14:46:36
 */
import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';


@Injectable()
export class AppStorageService {

    constructor(private request: RequestService) { }

    getAppStorage (AppStorageId: number): Observable<ApiData> {
        return this.request.get('接口地址', { AppStorageId });
    }
}
