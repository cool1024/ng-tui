import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TUICoreModule } from '../../tui-core/tui-core.module';
import { BadgeComponent } from './badge.component';
import { BadgesComponent } from './badges.component';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    imports: [
        TUICoreModule,
        DropdownModule,
        FormsModule,
    ],
    declarations: [
        BadgeComponent,
        BadgesComponent,
    ],
    exports: [
        BadgeComponent,
        BadgesComponent,
    ]
})
export class BadgeModule { }
