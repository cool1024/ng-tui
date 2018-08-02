import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../tui/modules/toast/toast.service';
import { ConfirmService } from '../../../tui/modules/confirm/confirm.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    constructor(private toast: ToastService, private confirm: ConfirmService) { }

    ngOnInit() {
    }

    showToast(color: string) {
        this.toast[color](color.toUpperCase(), 'Toast Message Content...');
    }

    showConfirm(color: string) {
        this.confirm[color](color.toUpperCase(), 'Confirm Message Content...');
    }

    showCustom() {
        this.toast.create('自定义标题', '这是一条自定义消息，图标还有颜色可以自由设置', { color: 'dark', icon: 'discount' });
    }

    showCustomConfirm() {
        this.confirm.create('自定义标题', '这是一条自定义确认对话框，图标还有颜色可以自由设置', { color: 'dark', icon: 'discount', cancelTitle: '拒绝', okTitle: '同意' });
    }

}
