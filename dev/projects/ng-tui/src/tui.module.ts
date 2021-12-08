import { NgModule, ModuleWithProviders } from '@angular/core';
import { TUIConfig } from './tui-core/interface/config.interface';
import { TUICoreModule } from './tui-core/tui-core.module';

@NgModule({
  exports: [TUICoreModule],
})
export class TUIModule {
  public static forRoot(config?: TUIConfig): ModuleWithProviders<TUIModule> {
    return {
      ngModule: TUIModule,
      providers: [{ provide: 'TUI_CONFIG', useValue: config || {} }],
    };
  }
}
