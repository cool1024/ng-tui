import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-datepicker',
    exportAs: 'tsDatepicker',
    template: ` <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
            <ng-content></ng-content>
        </div>
        <div
            #menuView="tsView"
            [ngStyle]="{ zIndex: zIndex }"
            position="auto"
            tsView="fadeIn"
            class="bg-white shadow no-select p-3"
        >
            <ts-date [activeDate]="activeDate" (dateChange)="sendChange($event)" [color]="color"></ts-date>
        </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true,
        },
    ],
})
export class DatepickerComponent extends FormDirective {
    @Input() zIndex = 1;

    activeDate!: string;

    writeValue(value: string): void {
        const date = new Date(value);
        if (date.getFullYear()) {
            this.activeDate = value;
        }
    }

    sendChange(value: string): void {
        this.changeHandle(value);
    }

    constructor(cfs: ConfigService) {
        super();
        this.color = cfs.config.defaultColor;
    }
}
