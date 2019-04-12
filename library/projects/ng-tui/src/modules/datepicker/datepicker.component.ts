import { Component, Input, forwardRef } from '@angular/core';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ts-datepicker',
    exportAs: 'tsDatepicker',
    template: `
    <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
        <ng-content></ng-content>
    </div>
    <div #menuView="tsView"
        [ngStyle]="{zIndex:zIndex}"
        position="auto"
        tsView="fadeIn"
        class="bg-white shadow no-select p-3">
        <ts-date [activeDate]="activeDate" (dateChange)="sendChange($event)" [color]="color"></ts-date>
    </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatepickerComponent),
        multi: true
    }]
})
export class DatepickerComponent extends BaseForm {

    @Input() zIndex: number;
    
    activeDate: string;


    writeValue(value: string) {
        let date = new Date(value);
        if (date.getFullYear()) {
            this.activeDate = value;
        }
    }

    sendChange(value: string) {
        this.changeHandle(value);
    }

    constructor(cfs: ConfigService) {
        super()
        this.color = cfs.config.defaultColor;
    }
}
