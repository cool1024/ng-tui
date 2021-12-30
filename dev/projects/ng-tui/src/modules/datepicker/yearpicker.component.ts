import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-yearpicker',
    exportAs: 'tsYearpicker',
    template: ` <div class="d-inline-block" tsToggle [target]="menuView" [bind]="menuView">
            <ng-content></ng-content>
        </div>
        <div
            #menuView="tsView"
            [ngStyle]="{ zIndex: zIndex }"
            tsView
            class="bg-white shadow no-select p-3"
        >
            <ts-year [activeYear]="activeYear" (yearChange)="sendChange($event)" [color]="color"></ts-year>
        </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => YearpickerComponent),
            multi: true,
        },
    ],
})
export class YearpickerComponent extends FormDirective {
    @Input() zIndex = 1;

    activeYear!: number;

    writeValue(value: number): void {
        this.activeYear = value;
    }

    sendChange(value: number): void {
        this.changeHandle(value || null);
    }

    constructor(cfs: ConfigService) {
        super();
        this.color = cfs.config.defaultColor;
    }
}
