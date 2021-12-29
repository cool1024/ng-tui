import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-checkbox',
    template: ` <div
        (click)="changeStatus()"
        [class.disabled]="isDisabled"
        class="d-inline-flex align-items-center radio-box select-none"
    >
        <div [class.active]="checked" class="radio radio-{{ color }} me-1">
            <div class="radio-check"></div>
        </div>
        <ng-content></ng-content>
    </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent extends FormDirective {
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

    changeStatus(): void {
        if (this.isDisabled) {
            return;
        }
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

    writeValue(values: any[]): void {
        this.innerValue = values || [];
        this.checked = this.hasValue();
    }

    private hasValue(): boolean {
        return this.innerValue.indexOf(this.value) >= 0;
    }
}
