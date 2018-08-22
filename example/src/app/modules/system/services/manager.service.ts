import { Injectable } from '@angular/core';
import { RequestService } from './../../../cores/services';
import { ApiData } from '../../../cores/classes';
import { Observable } from 'rxjs';
import { Manager } from '../interfaces/manager.interface';


@Injectable()
export class ManagerService {

    constructor(private request: RequestService) { }

    getManagerInfo(): Observable<ApiData> {
        return this.request.url('/managerapi/info');
    }

    updateManagerInfo(manager: Manager): Observable<ApiData> {
        return this.request.put('/managerapi/update', manager);
    }

    uplodaAvatar(file: File): Observable<string> {
        return this.request.ossUpload('/managerapi/avatar/access', file);
    }
}
