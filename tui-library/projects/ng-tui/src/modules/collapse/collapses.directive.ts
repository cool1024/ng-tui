import { Directive, Input, QueryList, ContentChildren, AfterViewInit } from '@angular/core';
import { ToggleDirective } from '../../tui-core/directive/toggle.directive';
import { CollapseDirective } from './collapse.directive';

@Directive({
    selector: '*[tsCollapses]',
    exportAs: 'tsCollapses',
})
export class CollapsesDirective implements AfterViewInit {
    @Input() auto: boolean;

    @ContentChildren(CollapseDirective) collapses!: QueryList<CollapseDirective>;

    @ContentChildren(ToggleDirective) toggles!: QueryList<ToggleDirective>;

    constructor() {
        this.auto = false;
    }

    ngAfterViewInit() {
        const collapses = this.collapses.toArray();
        this.toggles.forEach((e, index) => {
            e.setTarget(collapses[index]);
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
        this.collapses.forEach((e) => {
            if (e !== collapse) {
                e.open = false;
                e.updateCollapseShow();
            }
        });
    }
}
