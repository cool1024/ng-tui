/**
 * office文档浏览窗口
 *
 * @author xiaojian
 * @file   office-view.component.ts
 * @date   2018-6-22 11:25:19
 */
import { Component, OnInit } from '@angular/core';
import { WindowViewService } from 'ng-tui';

@Component({
    templateUrl: './office-view.component.html',
    styleUrls: ['./office-view.component.scss'],
})
export class OfficeViewComponent implements OnInit {

    constructor(public view: WindowViewService) { }

    ngOnInit() {

    }
}
