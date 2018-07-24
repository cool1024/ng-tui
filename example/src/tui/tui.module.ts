import { NgModule, ModuleWithProviders } from '@angular/core';
import { TUIConfig } from './tui-core/interfaces/config.interface';
import { IconfontModule } from './modules/iconfont/iconfont.module';
import { ButtonModule } from './modules/button/button.module';
import { CheckboxModule } from './modules/checkbox/checkbox.module';
import { DropdownModule } from './modules/dropdown/dropdown.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { SelectModule } from './modules/select/select.module';
import { CollapseModule } from './modules/collapse/collapse.module';
import { TabModule } from './modules/tab/tab.module';
import { BadgeModule } from './modules/badge/badge.module';
import { ToastModule } from './modules/toast/toast.module';
import { ProgressModule } from './modules/progress/progress.module';
import { ImageModule } from './modules/image/image.module';
import { ConfirmModule } from './modules/confirm/confirm.module';
import { CssloadModule } from './modules/cssload/cssload.module';
import { SearchModule } from './modules/search/select.module';

@NgModule({
    imports: [
        BadgeModule,
        ButtonModule,
        CheckboxModule,
        CollapseModule,
        ConfirmModule,
        CssloadModule,
        DropdownModule,
        IconfontModule,
        ImageModule,
        PaginationModule,
        ProgressModule,
        SearchModule,
        SelectModule,
        TabModule,
        ToastModule.forRoot({ position: 'bottom right', timeout: 3000, maxLength: 6 }),
    ],
    exports: [
        BadgeModule,
        ButtonModule,
        CheckboxModule,
        CollapseModule,
        ConfirmModule,
        CssloadModule,
        DropdownModule,
        IconfontModule,
        ImageModule,
        PaginationModule,
        ProgressModule,
        SearchModule,
        SelectModule,
        TabModule,
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
