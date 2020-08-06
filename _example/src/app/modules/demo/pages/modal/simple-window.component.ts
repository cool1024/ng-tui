/**
 * 简单窗口示例
 *
 * @author xiaojian
 * @file   simple-window.component.ts
 * @date   2018-8-31 09:55:52
 */
import { Component, OnInit } from '@angular/core';
import { WindowViewService } from 'ng-tui';

@Component({
    template: `
    <div class="bg-light h-100">
        <nav class="shadow-sm bg-white d-flex justify-content-between align-items-center position-absolute w-100 p-3">
            <h4 class="mb-0">simple-window</h4>
            <div>
                <span (click)="view.close()" class="text-muted text-danger-hover pointer">
                    <i class="fa fa-times mr-2" aria-hidden="true"></i>关闭
                </span>
            </div>
        </nav>
        <div class="h-100">

        </div>
    </div>`
})
export class SimpleWindowComponent implements OnInit {

    constructor(public view: WindowViewService) { }

    ngOnInit() {

    }
}
