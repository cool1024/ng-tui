import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { styleStr } from './style';

@Component({
    selector: 'ts-time',
    templateUrl: './time.html',
    styles: [styleStr]
})
export class TimeComponent extends BaseTheme {

    @Input() activeTime = {
        hour: 0,
        minute: 0,
        second: 0,
    };

    @Output() timeChange = new EventEmitter<any>(false);

    offsets = {
        hour: 0,
        minute: 0,
        second: 0
    };

    constructor(cfs: ConfigService) {
        super();
        this.color = cfs.config.defaultColor;
        this.setNow();
    }

    getTwoNumStr(num: number): string {
        return num > 9 ? num.toString() : `0${num}`;
    }

    getTimeStr(): string {
        // tslint:disable-next-line:max-line-length
        return `${this.getTwoNumStr(this.activeTime.hour)}:${this.getTwoNumStr(this.activeTime.minute)}:${this.getTwoNumStr(this.activeTime.second)}`;
    }

    setNow() {
        const date = new Date();
        Object.assign(this.activeTime, {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        });
    }


    setClean() {
        this.timeChange.emit(null);
    }

    confirmTime() {
        this.timeChange.emit(this.activeTime);
    }

    offsetTime(opt: WheelEvent | number, type: string, max: number) {
        if (typeof opt === 'number') {
            this.offsets[type] += opt;
        } else {
            if (opt.deltaY > 0) {
                this.offsets[type]++;
            } else if (opt.deltaY < 0) {
                this.offsets[type]--;
            }
        }
        this.activeTime[type] = ((this.offsets[type] + 2) % max);
        this.activeTime[type] = this.activeTime[type] < 0 ? this.activeTime[type] + max : this.activeTime[type];
    }

    getTimeArray(max: number): number[] {
        const tms = new Array<number>();
        for (let i = 0; i < max; i++) {
            tms.push(i);
        }
        return tms;
    }

    getTimes(offset: number, max: number): number[] {
        const tms = new Array<number>();
        const tmsArray = this.getTimeArray(max);
        for (let i = 0; i < 5; i++) {
            let tempOffset = (offset + i) % max;
            tempOffset = tempOffset < 0 ? max + tempOffset : tempOffset;
            tms.push(tmsArray[tempOffset]);
        }
        return tms;
    }
}

