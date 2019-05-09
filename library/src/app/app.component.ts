import { Component } from '@angular/core';
import { ToastService, FileItem } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private toast: ToastService) { }

    showToast() {
        this.toast.success('你好', '这是一条通知消息');
    }

    showNotify() {
        this.toast.notify({
            title: 'Well done!',
            // position: 'center',
            content: 'Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
        });
    }

    showFileItem(fileItem: FileItem) {
        console.log(fileItem);
    }

}
