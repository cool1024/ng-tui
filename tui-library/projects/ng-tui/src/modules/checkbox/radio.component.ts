import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-radio',
    template: `
        <div
            (click)="changeStatus()"
            [class.disabled]="isDisabled"
            class="d-inline-flex align-items-center radio-box select-none"
        >
            <div [class.active]="checked" class="radio radio-{{ color }} rounded-circle mr-1">
                <div class="radio-check rounded-circle"></div>
            </div>
            <ng-content></ng-content>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true,
        },
    ],
})
export class RadioComponent extends FormDirective {
    @Input() value: any;

    @Input() color: string;

    @Output() checkedChange = new EventEmitter<boolean>(false);

    checked: boolean;

    constructor(private configService: ConfigService) {
        super();
        this.checked = false;
        this.color = this.configService.config.defaultColor as any;
    }

    changeStatus(): void {
        if (this.checked || this.isDisabled) {
            return;
        }
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
        if (this.changeHandle && this.checked) {
            this.changeHandle(this.value);
        }
    }

    writeValue(value: any): void {
        this.checked = value === this.value;
    }
}
