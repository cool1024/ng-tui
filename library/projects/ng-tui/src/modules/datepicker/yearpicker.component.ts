import { Component, Input, forwardRef } from '@angular/core';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ts-yearpicker',
    exportAs: 'tsYearpicker',
    template: `
    <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
        <ng-content></ng-content>
    </div>
    <div #menuView="tsView"
        [ngStyle]="{zIndex:zIndex}"
        position="auto"
        tsView="fadeIn"
        class="bg-white shadow no-select p-3">
        <ts-year [activeYear]="activeYear" (yearChange)="sendChange($event)" [color]="color"></ts-year>
    </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => YearpickerComponent),
        multi: true
    }]
})
export class YearpickerComponent extends BaseForm {

    @Input() zIndex: number;

    activeYear: number;

    writeValue(value: number) {
        this.activeYear = value;
    }

    sendChange(value: number) {
        this.changeHandle(value || null);
    }

    constructor(cfs: ConfigService) {
        super()
        this.color = cfs.config.defaultColor;
    }
}
