import { NgModule, ModuleWithProviders } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ToastConfig } from './toast.interface';
import { IconfontModule } from '../iconfont/iconfont.module';

@NgModule({
    imports: [
        TUICoreModule,
        IconfontModule,
    ],
    declarations: [
        ToastComponent
    ],
    entryComponents: [
        ToastComponent,
    ]
})
export class ToastModule {
    static forRoot(config: ToastConfig = { position: 'ts-bottom ts-right', timeout: 2000, maxLength: 6 }): ModuleWithProviders {
        return {
            ngModule: ToastModule,
            providers: [
                ToastService,
                { provide: 'DEFAULT_CONFIG', useValue: config }
            ]
        };
    }
}
