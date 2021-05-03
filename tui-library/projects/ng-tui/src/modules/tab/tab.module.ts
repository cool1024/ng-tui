import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { NoteComponent } from './note.component';
import { TabComponent } from './tab.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        NoteComponent,
        TabComponent
    ],
    exports: [
        TUICoreModule,
        NoteComponent,
        TabComponent
    ]
})
export class TabModule { }
