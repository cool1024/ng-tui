import { Injectable, Inject } from '@angular/core';
import { ToastComponent } from './toast.component';
import { Toast } from './toast.class';
import { ToastConfig } from './toast.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { NotifyConfig } from './notify.interface';
import { NotifyComponent } from './notify.component';
import { timeout } from 'rxjs/operators';

@Injectable()
export class ToastService {

    private handler: ComponentHandle;

    constructor(
        @Inject('DEFAULT_CONFIG') private config: ToastConfig,
        private cmpService: ComponentService
    ) { }

    init() {
        // tslint:disable-next-line:no-unused-expression
        this.handler || (this.handler = this.cmpService.create(ToastComponent));
    }

    create(title: string, message: string, options: { color: string, icon: string, timeout?: number }) {
        this.init();
        this.handler.instance.addToast(new Toast(
            title, message, options.color, options.icon, options.timeout || this.config.timeout));
    }

    info(title: string, message: string, timer?: number) {
        this.create(title, message, {
            color: 'info',
            icon: 'information',
            timeout: timer || this.config.timeout
        });
    }

    success(title: string, message: string, timer?: number) {
        this.create(title, message, {
            color: 'success',
            icon: 'success',
            timeout: timer || this.config.timeout
        });
    }

    danger(title: string, message: string, timer?: number) {
        this.create(title, message, {
            color: 'danger',
            icon: 'wrong',
            timeout: timer || this.config.timeout
        });
    }

    warning(title: string, message: string, timer?: number) {
        this.create(title, message, {
            color: 'warning',
            icon: 'warning',
            timeout: timer || this.config.timeout
        });
    }

    notify(options: NotifyConfig) {
        const op: NotifyConfig = Object.assign({
            color: 'primary',
            timeout: this.config.timeout,
            width: '500px',
            position: 'top right'
        }, options);
        const handler = this.cmpService.create(NotifyComponent);
        handler.instance.config = op;
        // tslint:disable-next-line:no-unused-expression
        op.timeout >= 0 && setTimeout(() => {
            handler.destroy();
        }, op.timeout);
    }
}
