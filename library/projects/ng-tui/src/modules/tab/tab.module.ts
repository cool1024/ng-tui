import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TabsDirective, TabDirective } from './tab.directive';
import { TabComponent } from './tab.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        TabsDirective,
        TabDirective,
        TabComponent,
    ],
    exports: [
        TUICoreModule,
        TabsDirective,
        TabDirective,
        TabComponent,
    ]
})
export class TabModule { }
