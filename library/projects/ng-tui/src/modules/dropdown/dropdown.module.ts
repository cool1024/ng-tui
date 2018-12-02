import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ButtonModule } from '../button/button.module';
import { DropdownDirective, DropMenuDirective } from './dropdown.directive';
import { DropdownComponent } from './dropdown.component';
import { SideMenuGroupDirective, SideMenuDirective } from './side-menu.directive';

@NgModule({
    imports: [
        ButtonModule,
        TUICoreModule,
    ],
    declarations: [
        DropdownDirective,
        DropMenuDirective,
        DropdownComponent,
        SideMenuDirective,
        SideMenuGroupDirective,
    ],
    exports: [
        TUICoreModule,
        ButtonModule,
        DropdownDirective,
        DropMenuDirective,
        DropdownComponent,
        SideMenuDirective,
        SideMenuGroupDirective,
    ]
})
export class DropdownModule { }
