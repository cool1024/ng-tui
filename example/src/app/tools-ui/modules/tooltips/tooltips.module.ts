import { NgModule } from '@angular/core';
import { TooltipsDirective } from './tooltips.directive';

@NgModule({
    declarations: [
        TooltipsDirective
    ],
    exports: [
        TooltipsDirective
    ]
})
export class TooltipsModule { }
