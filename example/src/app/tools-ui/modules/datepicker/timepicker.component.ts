import { Component, OnInit, forwardRef } from '@angular/core';
import { Base, styleStr } from './base.class';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-timepicker',
    template: `
    <div [ngClass]="{'d-none':!show}" #pad class="fixed-top h-100 w-100" (click)="tryClose($event)">
        <div class="card p-3 ts-datepicker-hm no-select" [ngStyle]="datepickerStyle">
            <div class="ts-datepicker-ym-toolbar d-flex justify-content-between">
                <div>
                    <button class="btn btn-link btn-sm text-{{color}}">{{getTimeStr()}}</button>
                </div>
                <div class="text-right" style="width:240px">
                    <button (click)="setTime('');toggle()" tsBtn sm class="ml-1">现在</button>
                    <button (click)="setClean();toggle()" tsBtn sm class="ml-1">清空</button>
                    <button (click)="confirmTime();toggle()" tsBtn sm class="ml-1" [color]="color">确认</button>
                </div>
            </div>
            <hr class="mb-2">
            <div class="d-flex text-center">
                <div class="ts-datepicker-hm-box" (wheel)="offsetTime($event,'hour',24)">
                    <div (click)="offsetTime(-1,'hour',24)" class="pointer text-{{color}}-hover">
                        <i class="fa fa-fw fa-lg fa-angle-up"></i>
                    </div>
                    <div *ngFor="let hour of getTimes(offsets['hour'],24);index as i"
                        (click)="offsetTime(i-2,'hour',24)"
                        class="ts-time-item pointer {{i===2&&'text-'+color+' active'}}">
                        {{hour>9?hour:'0'+hour}}
                    </div>
                    <div (click)="offsetTime(+1,'hour',24)" class="pointer text-{{color}}-hover">
                        <i class="fa fa-fw fa-lg fa-angle-down"></i>
                    </div>
                </div>
                <div class="ts-datepicker-hm-box" (wheel)="offsetTime($event,'minute',60)">
                    <div (click)="offsetTime(-1,'minute',60)" class="pointer text-{{color}}-hover">
                        <i class="fa fa-fw fa-lg fa-angle-up"></i>
                    </div>
                    <div *ngFor="let minute of getTimes(offsets['minute'],60);index as i"
                        (click)="offsetTime(i-2,'minute',60)"
                        class="ts-time-item pointer {{i===2&&'text-'+color+' active'}}">
                        {{minute>9?minute:'0'+minute}}
                    </div>
                    <div (click)="offsetTime(+1,'minute',60)" class="pointer text-{{color}}-hover">
                        <i class="fa fa-fw fa-lg fa-angle-down"></i>
                    </div>
                </div>
                <div class="ts-datepicker-hm-box" (wheel)="offsetTime($event,'second',60)">
                    <div (click)="offsetTime(-1,'second',60)" class="pointer text-{{color}}-hover">
                        <i class="fa fa-fw fa-lg fa-angle-up"></i>
                    </div>
                    <div *ngFor="let second of getTimes(offsets['second'],60);index as i"
                        (click)="offsetTime(i-2,'second',60)"
                        class="ts-time-item pointer {{i===2&&'text-'+color+' active'}}">
                        {{second>9?second:'0'+second}}
                    </div>
                    <div (click)="offsetTime(+1,'second',60)" class="pointer text-{{color}}-hover">
                        <i class="fa fa-fw fa-lg fa-angle-down"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    styles: [styleStr],
    exportAs: 'tsTimepicker',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TimepickerComponent),
        multi: true
    }]
})
export class TimepickerComponent extends Base implements OnInit, ControlValueAccessor {

    offsets = {
        hour: 0,
        minute: 0,
        second: 0
    };

    activeTime = {
        hour: 0,
        minute: 0,
        second: 0,
    };

    constructor(html: HtmlDomService, configService: ConfigService) {
        super(html, configService.config);
    }

    ngOnInit() {
        this.setNow();
    }

    writeValue(value: string) {
        if (value === null) { return; }
        const times = value.split(':');
        if (times.length !== 3) {
            // console.error('time format error , must like 23:59:01');
            this.setNow();
        } else {
            this.activeTime = {
                hour: parseInt(times[0], 10) || 0,
                minute: parseInt(times[1], 10) || 0,
                second: parseInt(times[2], 10) || 0,
            };
        }
        this.offsets.hour = this.activeTime.hour - 2;
        this.offsets.minute = this.activeTime.minute - 2;
        this.offsets.second = this.activeTime.second - 2;
    }


    getTimeStr(): string {
        // tslint:disable-next-line:max-line-length
        return `${this.getTwoNumStr(this.activeTime.hour)}:${this.getTwoNumStr(this.activeTime.minute)}:${this.getTwoNumStr(this.activeTime.second)}`;
    }

    getTwoNumStr(num: number): string {
        return num > 9 ? num.toString() : `0${num}`;
    }

    setNow() {
        const date = new Date();
        Object.assign(this.activeTime, {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        });
    }

    setTime(value: string) {
        this.writeValue(value);
        this.applyChange(this.getTimeStr());
    }

    setClean() {
        this.applyChange('');
    }

    confirmTime() {
        this.applyChange(this.getTimeStr());
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
