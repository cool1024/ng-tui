import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WindowViewService {

    present(): Observable<any> { return null; }

    send(data?: any) { }

    close(datas?: any) { }

    getIndex(): number { return null; }
}
