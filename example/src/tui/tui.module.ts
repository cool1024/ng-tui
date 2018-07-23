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
@NgModule({
    imports: [
        BadgeModule,
        ButtonModule,
        CheckboxModule,
        CollapseModule,
        DropdownModule,
        IconfontModule,
        PaginationModule,
        SelectModule,
        TabModule,
    ],
    exports: [
        BadgeModule,
        ButtonModule,
        CheckboxModule,
        CollapseModule,
        DropdownModule,
        IconfontModule,
        PaginationModule,
        SelectModule,
        TabModule,
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
