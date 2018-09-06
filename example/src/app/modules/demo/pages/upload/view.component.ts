/**
 * 图片预览窗口
 *
 * @author xiaojian
 * @file   view.component.ts
 * @date   2018-8-29 22:21:52
 */
import { Component } from '@angular/core';
import { WindowViewService } from 'ng-tui';

@Component({
    template: `
    <div class="h-100" style="background-color:rgba(0,0,0,.6)">
        <span (click)="view.close()"
             class="position-fixed right top mr-2 pointer iconfont icon-wrong text-white"
             style="font-size:2rem;right"></span>
        <div class="h-100 d-flex justify-content-center align-items-center">
            <img class="shadow" style="max-width:90%;max-height:90%" [src]="src">
        </div>
    </div>`
})
export class ViewComponent {

    src: string;

    constructor(public view: WindowViewService) { }
}
