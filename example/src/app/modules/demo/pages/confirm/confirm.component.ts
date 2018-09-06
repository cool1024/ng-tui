/**
 * 确认对话框
 *
 * @author xiaojian
 * @file   confirm.component.ts
 * @date   2018-8-22 10:41:19
 */
import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'ng-tui';

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    simpleCode = `constructor(private confirm: ConfirmService) {
    this.confirm.success('警告', '你确定要这么做？');
}`;

    constructor(private confirm: ConfirmService) { }

    showConfirm(color: string) {
        this.confirm[color](color.toUpperCase(), 'Confirm Message Content...');
    }

    showCustomConfirm() {
        this.confirm.create('自定义标题', '这是一条自定义确认对话框，图标还有颜色可以自由设置', { color: 'dark', icon: 'account', cancelTitle: '拒绝', okTitle: '同意' });
    }

}
