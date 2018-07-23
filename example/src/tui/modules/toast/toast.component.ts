
import { Component, OnDestroy, Inject } from '@angular/core';
import { Toast } from './toast.class';
import { ToastConfig } from './toast.interface';

@Component({
    template: `
    <div *ngIf="show" class="{{position}} position-fixed alert m-2" style="width:20rem;z-index:9999">
        <div *ngFor="let toast of toasts"
            class="ts-toast animated fadeInUp alert rounded-0 bg-white {{toast.color}}"
            [class.ts-op-hidden]="(toast.timeout - toast.cx)<=1000">
            <h6 class="alert-heading">
                <i class="fa fa-fw {{toast.icon}}"></i>
                <span class="text-dark">{{toast.title}}</span>
                <span (click)="removeToast(toast)" class="pointer pull-right" style="opacity: 0.8;">&times;</span>
            </h6>
            <hr class="mb-2">
            <p class="mb-0 mt-0 text-dark">{{toast.message}}</p>
        </div>
    </div>
    `,
    styles: [`
        .animated {
            animation-duration: 0.5s;
            animation-fill-mode: both;
        }
        @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 100%, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
        }
        .fadeInUp {
            animation-name: fadeInUp;
        }
        .ts-toast{
            box-shadow: 1px 2px 3px #ccc;
            border-width: 0;
            border-left-width: 3px;
        }
        .close {
            cursor:pointer;
        }
        .ts-top {
            top:0
        }
        .ts-bottom {
            bottom:0
        }
        .ts-left {
            left:0
        }
        .ts-right {
            right:0;
        }
        .ts-op-hidden{
            opacity:0;
            transition: opacity 1s;
        }
        `,
    ]
})
export class ToastComponent implements OnDestroy {

    toasts: Toast[];

    maxLength = 5;

    position: string;

    dValue = 500;

    show = true;

    private timer: any;

    constructor(
        @Inject('DEFAULT_CONFIG') private config: ToastConfig,
    ) {
        this.toasts = new Array<Toast>();
        this.position = this.config.position;
        this.maxLength = this.config.maxLength;
        this.timer = null;
    }

    addToast(toast: Toast) {
        if (this.timer === null) {
            this.timer = setInterval(() => {
                this.checkTimeOut();
            }, this.dValue);
        }
        if (this.toasts.length > this.maxLength) {
            this.toasts.shift();
        }
        // 如果有重复的，那么移除之前的消息
        const index = this.toasts.findIndex(e => e.message === toast.message && e.title === toast.title);
        if (index >= 0) {
            this.toasts.splice(index, 1);
        }
        this.toasts.push(toast);
        this.show = true;
    }

    removeToast(toast: Toast) {
        this.toasts.splice(this.toasts.indexOf(toast), 1);
    }

    checkTimeOut() {
        this.toasts.forEach(toast => {
            toast.cx += this.dValue;
        });
        this.toasts = this.toasts.filter(toast => toast.timeout > toast.cx || toast.timeout === -1);
        if (this.toasts.length <= 0) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    ngOnDestroy() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

}
