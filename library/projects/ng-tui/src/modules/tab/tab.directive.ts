import {
    Directive,
    ContentChildren,
    forwardRef,
    Input,
    HostBinding,
    QueryList,
    ChangeDetectorRef
} from '@angular/core';

@Directive({
    selector: `*[tsTabs]`,
    exportAs: 'tsTabs'
})
export class TabsDirective {

    @ContentChildren(forwardRef(() => TabDirective)) tabs: QueryList<TabDirective>;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    changeTab(tab: string | number) {
        if (typeof tab === 'number') {
            this.tabs.forEach(e => e.setHidden());
            const tabs = this.tabs.toArray();
            // tslint:disable-next-line:no-unused-expression
            tabs[tab] && tabs[tab].setShow();
        } else {
            this.tabs.forEach(e => {
                if (e.tab === tab) {
                    e.setShow();
                } else {
                    e.setHidden();
                }
            });
        }
        this.changeDetectorRef.detectChanges();
    }
}

@Directive({
    selector: `*[tsTab]`,
    exportAs: 'tsTab'
})
export class TabDirective {

    @Input() tab: string;

    @HostBinding('style.display') dispaly: string;

    setHidden() {
        this.dispaly = 'none';
    }

    setShow() {
        this.dispaly = '';
    }

}
