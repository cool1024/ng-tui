import {
  Injectable,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
} from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { Observable } from 'rxjs';
import { ConfigService } from '../../tui-core/service/config.service';
import { ConfirmOptions } from './confirm.interface';
import { TUIConfig } from '../../tui-core/interface/config.interface';
import { TUI_CONST } from '../../tui-core/const';

const THEME = TUI_CONST.BOOTSTRAP.THEME;

@Injectable()
export class ConfirmService {
  private baseComponent!: ComponentFactory<ConfirmComponent>;
  private windowCmptRef!: ComponentRef<ConfirmComponent>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private options: ConfigService,
    private config: TUIConfig
  ) {}

  private init(): void {
    if (this.baseComponent !== undefined || this.baseComponent != null) {
      return;
    }
    this.baseComponent =
      this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
    this.windowCmptRef = this.baseComponent.create(this.injector);
    this.applicationRef.attachView(this.windowCmptRef.hostView);
    const containerEl = document.body;
    if (containerEl) {
      containerEl.appendChild(this.windowCmptRef.location.nativeElement);
    }
  }

  create(
    title: string,
    message: string,
    options: ConfirmOptions
  ): Observable<boolean> {
    this.init();
    this.windowCmptRef.instance.title = title;
    this.windowCmptRef.instance.message = message;
    this.windowCmptRef.instance.play();
    this.windowCmptRef.instance.color =
      options.color || this.config.defaultColor;
    this.windowCmptRef.instance.config = this.combineOptions(options);
    return this.windowCmptRef.instance.updateHandle();
  }

  info(
    title: string,
    message: string,
    options?: { okTitle?: string; cancelTitle?: string }
  ): Observable<boolean> {
    const config = this.combineOptions(options || {});
    config.icon = this.config.confirm.icon.info;
    config.color = THEME.INFO;
    return this.create(title, message, config);
  }

  warning(
    title: string,
    message: string,
    options?: { okTitle?: string; cancelTitle?: string }
  ): Observable<boolean> {
    const config = this.combineOptions(options || {});
    config.icon = this.config.confirm.icon.warning;
    config.color = THEME.WARNING;
    return this.create(title, message, config);
  }

  danger(
    title: string,
    message: string,
    options?: { okTitle?: string; cancelTitle?: string }
  ): Observable<boolean> {
    const config = this.combineOptions(options || {});
    config.icon = this.config.confirm.icon.warning;
    config.color = THEME.DANGER;
    return this.create(title, message, config);
  }

  success(
    title: string,
    message: string,
    options?: { okTitle?: string; cancelTitle?: string }
  ): Observable<boolean> {
    const config = this.combineOptions(options || {});
    config.icon = this.config.confirm.icon.success;
    config.color = THEME.SUCCESS;
    return this.create(title, message, config);
  }

  combineOptions(options: { okTitle?: string; cancelTitle?: string }): any {
    return {
      okTitle: options.okTitle || this.options.config.confirm.confirmOkTitle,
      cancelTitle:
        options.cancelTitle || this.options.config.confirm.confirmCancelTitle,
    };
  }
}
