import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-switch',
    template: `
    <div (click)="toggle()" class="d-inline-flex align-items-center switch switch-{{color}}"
        [class.active]="isOpen" [class.disabled]="isDisabled">
        <div class="switch-line text-left mr-1 position-relative">
            <div class="d-inline-block rounded-circle switch-bar bg-white"></div>
        </div>
        <ng-content></ng-content>
    </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SwitchComponent),
        multi: true
    }]
})
export class SwitchComponent extends BaseForm {

    @Input() values: { open: any, close: any };

    @Input() color: string;

    value: any;

    get isOpen(): boolean { return this.value === this.values.open; }

    constructor(private configService: ConfigService) {
        super();
        this.values = { open: true, close: false };
        this.value = false;
        this.color = this.configService.config.defaultColor;
    }

    writeValue(value: any) { this.value = value; }

    toggle() {
        if (this.isDisabled) { return; }
        this.value = this.isOpen ? this.values.close : this.values.open;
        // tslint:disable-next-line:no-unused-expression
        this.changeHandle && this.changeHandle(this.value);
    }
}
