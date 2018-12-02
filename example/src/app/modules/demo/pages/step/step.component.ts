/**
 * 步骤列表页面
 *
 * @author xiaojian
 * @file   step.component.ts
 * @date   2018-9-4 19:00:47
 */
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../cores/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiData } from '../../../../cores/classes';
import { Item } from 'ng-tui';

@Component({
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

    provinceDatas = new Array<Item>();

    cityDatas = new Array<Item>();

    areaDatas = new Array<Item>();

    constructor(private request: RequestService) { }

    ngOnInit() {
        // this.provincesOb.subscribe(datas => this.provinceDatas = datas);
    }

    // get provincesOb(): Observable<Item[]> {
    //     return this.request.url('/managerapi/china/p').pipe(
    //         map<ApiData, Item[]>(res =>
    //             res.datas.map(item => ({ value: item.id, text: item.name }))
    //         )
    //     );
    // }
}
