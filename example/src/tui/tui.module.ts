import { NgModule, ModuleWithProviders } from '@angular/core';
import { TUIConfig } from './tui-core/interfaces/config.interface';
import { IconfontModule } from './modules/iconfont/iconfont.module';
import { ButtonModule } from './modules/button/button.module';
import { CheckboxModule } from './modules/checkbox/checkbox.module';
import { DropdownModule } from './modules/dropdown/dropdown.module';
import { PaginationModule } from './modules/pagination/pagination.module';
@NgModule({
    imports: [
        IconfontModule,
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        PaginationModule,
    ],
    exports: [
        IconfontModule,
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        PaginationModule,
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
