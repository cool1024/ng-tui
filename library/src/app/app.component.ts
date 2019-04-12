import { Component } from '@angular/core';
import { ToastService, ToggleDirective, MenuService } from 'projects/ng-tui/src/public_api';
import { Item } from 'projects/ng-tui/src/tui-core/interfaces/item.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private toast: ToastService,
        private menu: MenuService
    ) { }

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


    showMenu(dom: HTMLElement) {
        this.menu.showMenu(dom, ['显示提示消息', '通知消息'], { position: 'bottom' })
            .subscribe(item => this.doSome(item));
    }

    doSome(item: Item) {
        [() => this.showToast(), () => this.showNotify()][item.value]();
    }
}
