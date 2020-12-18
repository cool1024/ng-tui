import { Injectable } from "@angular/core";
import { requestObject } from 'projects/ng-tui/src/public_api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileItem } from "./file";
``
@Injectable()
export class Api {

    private hostUrl = 'http://127.0.0.1:8080';

    getDirs(path: string): Observable<FileItem[]> {
        return requestObject('/assets/album.json').pipe(this.dataMap)
        // return requestObject(`${this.hostUrl}/dir?dir=${path}`).pipe(this.dataMap)
    }

    private dataMap = map((res: any): FileItem[] => {
        let items = Array<FileItem>();
        if (res.result) {
            items = res.data;
        }
        return items;
    });
}