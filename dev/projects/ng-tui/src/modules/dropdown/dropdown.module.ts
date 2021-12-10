import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { IconfontModule } from '../iconfont/iconfont.module';
import { DropMenuComponent } from './drop-menu.component';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  imports: [TUICoreModule, IconfontModule],
  declarations: [DropdownComponent, DropMenuComponent],
  exports: [
    TUICoreModule,
    IconfontModule,
    DropdownComponent,
    DropMenuComponent,
  ],
})
export class DropdownModule {}
