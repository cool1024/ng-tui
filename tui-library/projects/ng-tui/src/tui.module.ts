import { NgModule, ModuleWithProviders } from '@angular/core';
import { TUIConfig } from './tui-core/interface/config.interface';

@NgModule()
export class TUIModule {
    public static forRoot(config?: TUIConfig): ModuleWithProviders<TUIModule> {
        return {
            ngModule: TUIModule,
            providers: [{ provide: 'TUI_CONFIG', useValue: config || {} }],
        };
    }
}
