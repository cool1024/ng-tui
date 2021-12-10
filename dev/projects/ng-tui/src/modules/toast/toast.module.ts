import { NgModule, ModuleWithProviders } from '@angular/core';
import { IconfontModule } from '../iconfont/iconfont.module';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ToastConfig } from './toast.interface';

@NgModule({
  imports: [TUICoreModule, IconfontModule],
  declarations: [ToastComponent],
  entryComponents: [ToastComponent],
  providers: [ToastService],
})
export class ToastModule {
  static forRoot(
    config: ToastConfig = {
      position: 'bottom right',
      timeout: 3000,
      maxLength: 6,
    }
  ): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        ToastService,
        { provide: 'DEFAULT_CONFIG', useValue: config },
      ],
    };
  }
}
