import { Component, OnInit } from '@angular/core';
import { ToastService, ConfirmService } from 'ng-tui';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    simpleCode = `constructor(private toast: ToastService) {
    this.toast.success('操作成功', '成功添加新项目到仓库～');
}`;

    constructor(private toast: ToastService, private confirm: ConfirmService) { }

    ngOnInit() {
    }

    showToast(color: string) {
        this.toast[color](color.toUpperCase(), 'Toast Message Content...');
    }

    showCustom() {
        this.toast.create('自定义标题', '这是一条自定义消息，图标还有颜色可以自由设置', { color: 'dark', icon: 'account' });
    }

}
