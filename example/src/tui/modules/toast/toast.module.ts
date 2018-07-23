import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from './../../commons/common.module';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ToastConfig } from './toast.interface';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ToastComponent
    ],
    exports: [
        CommonModule,
        ToastComponent,
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
