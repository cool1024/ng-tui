import { Component } from '@angular/core';
import { ToastService, ToggleDirective } from 'projects/ng-tui/src/public_api';

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
            content: 'This example text is going to run a bit ...',
        });
    }

    bindView(toggle: ToggleDirective) {
        console.log(toggle);
    }

}
