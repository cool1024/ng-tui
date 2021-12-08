import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { CollapseModule } from '../collapse/collapse.module';
import { MenuComponent } from './menu.component';
import { MenusComponent } from './menus.component';
import { MenusMiniComponent } from './menus-mini.component';

@NgModule({
  imports: [TUICoreModule, CollapseModule],
  declarations: [MenuComponent, MenusComponent, MenusMiniComponent],
  exports: [
    TUICoreModule,
    CollapseModule,
    MenuComponent,
    MenusComponent,
    MenusMiniComponent,
  ],
})
export class MenuModule {}
