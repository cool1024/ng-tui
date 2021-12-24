import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';
import { Util } from '../../tui-core/util';

@Component({
    selector: 'ts-timepicker',
    exportAs: 'tsTimepicker',
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
            <ts-time [activeTime]="activeTime" (timeChange)="sendChange($event)" [color]="color"></ts-time>
        </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimepickerComponent),
            multi: true,
        },
    ],
})
export class TimepickerComponent extends FormDirective {
    @Input() zIndex = 1;

    activeTime = {
        hour: 0,
        minute: 0,
        second: 0,
    };

    writeValue(value: string): void {
        if (Util.isNullOrEmpty(value)) {
            return this.setNow();
        }

        this.formatTime(value);
    }

    formatTime(value: string): void {
        const times = value.split(':');
        if (times.length !== 3) {
            // console.error('time format error , must like 23:59:01');
            return this.setNow();
        } else {
            this.activeTime = {
                hour: parseInt(times[0], 10) || 0,
                minute: parseInt(times[1], 10) || 0,
                second: parseInt(times[2], 10) || 0,
            };
        }
    }

    setNow(): void {
        const date = new Date();
        this.activeTime = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        };
    }

    sendChange(value: number): void {
        this.changeHandle(value && Util.getTimeStr(this.activeTime));
    }

    constructor(cfs: ConfigService) {
        super();
        this.color = cfs.config.defaultColor;
    }
}
