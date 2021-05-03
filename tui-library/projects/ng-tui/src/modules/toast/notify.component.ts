import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TUIComponent } from '../../tui-core/component-creator/component.interface';
import { NotifyConfig } from './notify.interface';
import { ComponentHandleService } from '../../tui-core/component-creator/handle.service';

@Component({
    template: ` <div #notify class="position-fixed {{ config.position }} d-flex px-3 pt-3 animated slideInUp">
        <div
            *ngIf="model === 'small'"
            [ngStyle]="style"
            class="m-auto alert alert-{{ config.color }} alert-dismissible fade show"
            role="alert"
        >
            {{ config.content }}
            <button (click)="handler.destroy()" type="button" class="close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div *ngIf="model === 'full'" class="center alert alert-{{ config.color }}" [ngStyle]="style">
            <h4 class="alert-heading">
                <span>{{ config.title }}</span>
                <button (click)="handler.destroy()" type="button" class="close text-{{ config.color }}">
                    <span aria-hidden="true">&times;</span>
                </button>
            </h4>
            <hr />
            <p class="mb-0">{{ config.content }}</p>
        </div>
    </div>`,
})
export class NotifyComponent implements TUIComponent, OnInit, OnDestroy {
    config: NotifyConfig;
    interval: any;

    @ViewChild('notify') notify!: ElementRef;

    get style(): any {
        return this.config
            ? {
                  width: this.config.width,
              }
            : {};
    }

    get model(): string {
        if (this.config.title && this.config) {
            return 'full';
        }
        if (!this.config.title && this.config.content) {
            return 'small';
        }
        return 'default';
    }

    constructor(public handler: ComponentHandleService) {
        this.config = {};
    }

    ngOnInit(): void {
        if (!this.config.timeout) {
            return;
        }
        const timeout = this.config.timeout;
        if (timeout > 0) {
            let cx = 0;
            this.interval = setInterval(() => {
                cx += 100;
                if (timeout - cx < 500) {
                    this.notify.nativeElement.classList.add('toast-hidden');
                }
            }, 100);
        }
    }

    ngOnDestroy(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    present(): void {}
    dismiss(): void {}
    destroy(): void {}
}
