import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ButtonModule } from '../button/button.module';
import { DropdownComponent } from './dropdown.component';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';

@NgModule({
    imports: [
        ButtonModule,
        TUICoreModule,
    ],
    declarations: [
        DropdownComponent,
        MenuComponent
    ],
    entryComponents: [
        MenuComponent
    ],
    providers: [
        MenuService
    ],
    exports: [
        TUICoreModule,
        ButtonModule,
        DropdownComponent,
    ]
})
export class DropdownModule { }
