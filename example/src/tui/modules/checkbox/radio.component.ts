import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseForm } from '../../tui-core/base-class/base-form.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-radio',
    template: `
    <div (click)="changeStatus()" [class.disabled]="isDisabled" class="d-inline-flex align-items-center radio-box">
        <div [class.active]="checked" class="radio radio-{{color}} rounded-circle mr-1">
            <div class="radio-check rounded-circle"></div>
        </div>
        <ng-content></ng-content>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
    }]
})
export class RadioComponent extends BaseForm {

    @Input() value: any;

    @Input() color: string;

    @Output() checkedChange = new EventEmitter<boolean>(false);

    checked: boolean;

    constructor(private configService: ConfigService) {
        super();
        this.checked = false;
        this.color = this.configService.config.defaultColor;
    }

    changeStatus() {
        if (this.checked || this.isDisabled) { return; }
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
        if (this.changeHandle && this.checked) {
            this.changeHandle(this.value);
        }
    }

    writeValue(value: any) { this.checked = value === this.value; }
}
