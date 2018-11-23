import { NgModule } from '@angular/core';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { IconfontModule } from '../iconfont/iconfont.module';

@NgModule({
    imports: [
        TUICoreModule,
        IconfontModule,
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        SearchComponent,
    ],
    exports: [
        FormsModule,
        SearchComponent,
    ]
})
export class SearchModule { }
