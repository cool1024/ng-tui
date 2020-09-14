import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-switch',
    template: `
    <div (click)="toggle()" class="d-inline-flex align-items-center switch switch-{{color}} select-none"
        [class.active]="isOpen" [class.disabled]="isDisabled">
        <div class="switch-line text-left mr-1 position-relative">
            <div class="d-inline-block rounded-circle switch-bar bg-white"></div>
        </div>
        <div [class]="applyStyle(isOpen, activeClass)">
            <ng-content></ng-content>
        </div>
    </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SwitchComponent),
        multi: true
    }]
})
export class SwitchComponent extends BaseForm {

    @Input() values: { open: any, close: any };

    @Input()
    set value(v: { open: any, close: any }) {
        this.values = v;
    }

    get value(): { open: any, close: any } {
        return this.values
    }

    @Input() activeClass: string;
    @Input() color: string;

    @Output() checkedChange = new EventEmitter<boolean>(false);

    _value: any;

    get isOpen(): boolean { return this._value === this.values.open; }

    constructor(private configService: ConfigService) {
        super();
        this.values = { open: true, close: false };
        this._value = false;
        this.color = this.configService.config.defaultColor;
    }

    writeValue(value: any) { this._value = value; }

    toggle() {
        if (this.isDisabled) { return; }
        this.checkedChange.emit(this.isOpen);
        this._value = this.isOpen ? this.values.close : this.values.open;
        this.changeHandle && this.changeHandle(this._value);
    }
}
