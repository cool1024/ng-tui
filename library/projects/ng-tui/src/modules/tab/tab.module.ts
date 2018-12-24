import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { TabsDirective, TabDirective } from './tab.directive';
import { TabsComponent } from './tabs.component';
import { SideTabsComponent, TabComponent } from './side-tabs.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        TabsDirective,
        TabDirective,
        TabsComponent,
        TabComponent,
        SideTabsComponent,
    ],
    exports: [
        TUICoreModule,
        TabsDirective,
        TabDirective,
        TabsComponent,
        TabComponent,
        SideTabsComponent,
    ]
})
export class TabModule { }
