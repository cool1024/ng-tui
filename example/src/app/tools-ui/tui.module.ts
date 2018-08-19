import { NgModule, ModuleWithProviders } from '@angular/core';
import { TUIConfig } from './tui-core/interfaces/config.interface';
import { ToastModule } from './modules/toast/toast.module';

@NgModule({
    imports: [
        ToastModule.forRoot({ position: 'bottom right', timeout: 3000, maxLength: 6 }),
    ],
    exports: [
        ToastModule,
    ]
})
export class TUIModule {
    public static forRoot(config?: TUIConfig): ModuleWithProviders {
        return {
            ngModule: TUIModule,
            providers: [
                { provide: 'TUI_CONFIG', useValue: config || {} }
            ]
        };
    }
}
