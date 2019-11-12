import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-sort',
    template: `
    <div (click)="toggle()" class="pointer" style="line-height:0.6;">
        <i class="iconfont icon-caret-up {{statusIndex===2?('text-'+color):'text-muted'}}"></i><br>
        <i class="iconfont icon-caret-down {{statusIndex===0?('text-'+color):'text-muted'}}"></i>
    </div>

    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SortComponent),
        multi: true
    }]
})
export class SortComponent extends BaseForm {

    @Input() color: string;
    statusIndex: number;

    private values = [-1, 0, 1];

    constructor(private configService: ConfigService) {
        super();
        this.statusIndex = 1;
        this.color = this.configService.config.defaultColor;
    }

    writeValue(value: number) {
        const index = this.values.indexOf(value);
        if (index >= 0) {
            this.statusIndex = index;
        }
    }

    toggle() {
        if (this.isDisabled) { return; }
        this.statusIndex = (++this.statusIndex) % this.values.length;
        // tslint:disable-next-line:no-unused-expression
        this.changeHandle && this.changeHandle(this.values[this.statusIndex]);
    }
}