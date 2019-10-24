import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { NoteComponent } from './note.component';

@NgModule({
    imports: [
        TUICoreModule,
    ],
    declarations: [
        NoteComponent
    ],
    exports: [
        TUICoreModule,
        NoteComponent
    ]
})
export class TabModule { }
