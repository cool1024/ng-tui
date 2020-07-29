import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-checkbox',
    template: `
        <div (click)="changeStatus()" [class.disabled]="isDisabled" class="d-inline-flex align-items-center radio-box select-none">
            <div [class.active]="checked" class="radio radio-{{color}} mr-1">
                <div class="radio-check"></div>
            </div>
            <ng-content></ng-content>
        </div>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent extends BaseForm {

    @Input() value: any;

    @Input() color: string;

    @Output() checkedChange = new EventEmitter<boolean>(false);

    checked: boolean;

    private innerValue: any[];

    constructor(private configService: ConfigService) {
        super();
        this.checked = false;
        this.innerValue = [];
        this.color = this.configService.config.defaultColor;
    }

    changeStatus() {
        if (this.isDisabled) { return; }
        this.checked = !this.checked;
        if (this.checked && !this.hasValue()) {
            this.innerValue.push(this.value);
        } else if (!this.checked && this.hasValue()) {
            const index = this.innerValue.indexOf(this.value);
            this.innerValue.splice(index, 1);
        }
        if (this.changeHandle) {
            this.changeHandle(this.innerValue.concat());
        }
        this.checkedChange.emit(this.checked);
    }

    writeValue(values: any[]) {
        this.innerValue = values || [];
        this.checked = this.hasValue();
    }

    private hasValue(): boolean {
        return this.innerValue.indexOf(this.value) >= 0;
    }
}
