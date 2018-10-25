import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window.component';
import { WindowDirective } from './window.directive';
import { WindowService } from './window.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WindowComponent,
        WindowDirective,
    ],
    entryComponents: [
        WindowComponent,
    ],
    providers: [
        WindowService,
    ]
})
export class WindowModule { }
