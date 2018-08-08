import { NgModule } from '@angular/core';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { ButtonModule } from '../button/button.module';
import { DropdownDirective, DropMenuDirective } from './dropdown.directive';
import { DropdownComponent } from './dropdown.component';

@NgModule({
    imports: [
        ButtonModule,
        TUICoreModule,
    ],
    declarations: [
        DropdownDirective,
        DropMenuDirective,
        DropdownComponent,
    ],
    exports: [
        TUICoreModule,
        ButtonModule,
        DropdownDirective,
        DropMenuDirective,
        DropdownComponent
    ]
})
export class DropdownModule { }
