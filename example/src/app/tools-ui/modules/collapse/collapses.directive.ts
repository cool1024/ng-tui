import { Directive, Input, QueryList, ContentChildren, forwardRef, AfterViewInit } from '@angular/core';
import { CollapseDirective } from './collapse.directive';
import { ToggleDirective } from '../../tui-core/directives/toggle.directives';

@Directive({
    selector: '*[tsCollapses]',
    exportAs: 'tsCollapses',
})
export class CollapsesDirective implements AfterViewInit {

    @Input() auto: boolean;

    @ContentChildren(forwardRef(() => CollapseDirective)) collapses: QueryList<CollapseDirective>;

    @ContentChildren(forwardRef(() => ToggleDirective)) toggles: QueryList<ToggleDirective>;

    constructor() {
        this.auto = false;
    }

    ngAfterViewInit() {
        const collapses = this.collapses.toArray();
        this.toggles.forEach((e, index) => {
            e.target = collapses[index];
            e.handleFunc = (collapse: CollapseDirective) => {
                if (this.auto) {
                    if (this.auto) {
                        this.closeOther(collapse);
                    }
                }
            };
        });
    }

    closeOther(collapse: CollapseDirective) {
        this.collapses.forEach(e => {
            if (e !== collapse) {
                e.collapseClose();
            }
        });
    }
}
