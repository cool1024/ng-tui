/**
 * 请编写服务文件说明
 *
 * @author 填写作者
 * @file   server-test.service.ts
 * @date   2018-12-14 14:42:14
 */
import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';


@Injectable()
export class ServerTestService {

    constructor(private request: RequestService) { }

    getServerTest (ServerTestId: number): Observable<ApiData> {
        return this.request.get('接口地址', { ServerTestId });
    }
}
