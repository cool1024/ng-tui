/**
 * tooltips examplage page
 *
 * @author xiaojian
 * @file   tooltips.component.ts
 * @date   2018-8-19 17:11:38
 */
import { Component } from '@angular/core';

@Component({
    templateUrl: './tooltips.component.html',
    styleUrls: ['./tooltips.component.scss']
})
export class TooltipsComponent {

    simpleCode = `<span class="btn-icon btn-icon-danger" tsTip="删除">
    <i class="iconfont icon-delete"></i>
</span>`;

    constructor() { }
}
