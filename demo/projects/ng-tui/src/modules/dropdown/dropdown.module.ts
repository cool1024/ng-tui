import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ButtonModule } from '../button/button.module';
import { DropdownComponent } from './dropdown.component';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MenuDirective } from './menu.directive';
import { SideMenuDirective, SideMenuGroupDirective } from './side-menu.directive';

@NgModule({
    imports: [
        ButtonModule,
        TUICoreModule,
    ],
    declarations: [
        DropdownComponent,
        MenuComponent,
        MenuDirective,
        SideMenuDirective,
        SideMenuGroupDirective,
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
        MenuDirective,
        SideMenuDirective,
        SideMenuGroupDirective,
    ]
})
export class DropdownModule { }
