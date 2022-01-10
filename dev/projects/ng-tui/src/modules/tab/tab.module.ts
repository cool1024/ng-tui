import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { NoteComponent } from './note.component';
import { TabComponent, TabItemDirective } from './tab.component';

@NgModule({
  imports: [TUICoreModule],
  declarations: [NoteComponent, TabComponent, TabItemDirective],
  exports: [TUICoreModule, NoteComponent, TabComponent, TabItemDirective],
})
export class TabModule {}
