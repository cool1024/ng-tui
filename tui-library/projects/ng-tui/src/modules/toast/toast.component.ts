import { Component, OnDestroy, Inject } from '@angular/core';
import { Toast } from './toast.class';
import { ToastConfig } from './toast.interface';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';

@Component({
    template: ` <div class="{{ position }} position-fixed mr-3 mt-3 ml-3" style="z-index:9999">
        <div
            *ngFor="let toast of toasts"
            class="toast border-{{ toast.color }} animated slideInUp alert rounded-0 bg-white shadow-sm"
            [class.toast-hidden]="toast.timeout - toast.cx <= 1000 && toast.timeout !== -1"
        >
            <h6 class="alert-heading d-flex justify-content-between">
                <div>
                    <i [tsIcon]="toast.icon" [ngClass]="'text-' + toast.color"></i>
                    <span class="text-dark ml-2">{{ toast.title }}</span>
                </div>
                <span (click)="removeToast(toast)" class="pointer pull-right" style="opacity: 0.8;">&times;</span>
            </h6>
            <hr class="mb-2" />
            <p class="mb-0 mt-0 text-dark">{{ toast.message }}</p>
        </div>
    </div>`,
})
export class ToastComponent implements OnDestroy, TUIComponent {
    toasts: Toast[];

    maxLength = 5;

    position: string;

    dValue = 500;

    private timer: any;

    constructor(@Inject('DEFAULT_CONFIG') private config: ToastConfig) {
        this.toasts = new Array<Toast>();
        this.position = this.config.position;
        this.maxLength = this.config.maxLength;
        this.timer = null;
    }

    addToast(toast: Toast): void {
        if (this.timer === null) {
            this.timer = setInterval(() => {
                this.checkTimeOut();
            }, this.dValue);
        }
        if (this.toasts.length > this.maxLength) {
            this.toasts.shift();
        }
        // 如果有重复的，那么移除之前的消息
        const index = this.toasts.findIndex((e) => e.message === toast.message && e.title === toast.title);
        if (index >= 0) {
            this.toasts.splice(index, 1);
        }
        this.toasts.push(toast);
    }

    removeToast(toast: Toast): void {
        this.toasts.splice(this.toasts.indexOf(toast), 1);
    }

    checkTimeOut(): void {
        this.toasts.forEach((toast) => {
            toast.cx += this.dValue;
        });
        this.toasts = this.toasts.filter((toast) => toast.timeout > toast.cx || toast.timeout === -1);
        if (this.toasts.length <= 0) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    ngOnDestroy(): void {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    present(): void {}
    dismiss(): void {}
    destroy(): void {}
}
