import { Injectable, Inject } from '@angular/core';
import { Toast } from './toast.class';
import { ToastConfig } from './toast.interface';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { ToastComponent } from './toast.component';

@Injectable()
export class ToastService {
  private handler!: ComponentHandle;

  constructor(
    @Inject('DEFAULT_CONFIG') private config: ToastConfig,
    private cmpService: ComponentService
  ) {}

  init(): void {
    this.handler || (this.handler = this.cmpService.create(ToastComponent));
  }

  create(
    title: string,
    message: string,
    options: { color: string; icon?: string; timeout?: number }
  ): void {
    this.init();
    const toast = this.handler.instance as ToastComponent;
    toast.addToast(
      new Toast(
        title,
        message,
        options.color,
        options.icon || '',
        options.timeout || this.config.timeout
      )
    );
  }

  info(title: string, message: string, timer?: number): void {
    this.create(title, message, {
      color: 'info',
      icon: 'info',
      timeout: timer || this.config.timeout,
    });
  }

  success(title: string, message: string, timer?: number): void {
    this.create(title, message, {
      color: 'success',
      icon: 'success',
      timeout: timer || this.config.timeout,
    });
  }

  danger(title: string, message: string, timer?: number): void {
    this.create(title, message, {
      color: 'danger',
      icon: 'danger',
      timeout: timer || this.config.timeout,
    });
  }

  warning(title: string, message: string, timer?: number): void {
    this.create(title, message, {
      color: 'warning',
      icon: 'warning',
      timeout: timer || this.config.timeout,
    });
  }
}
