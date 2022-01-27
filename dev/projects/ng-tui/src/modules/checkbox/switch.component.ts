import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormDirective } from '../../tui-core/directive/form.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-switch',
    template: ` <div
        (click)="toggle()"
        class="d-inline-flex align-items-center switch switch-{{ color }} select-none"
        [class.active]="isOpen"
        [class.disabled]="isDisabled"
    >
        <div class="switch-line text-left me-1 position-relative">
            <div class="d-inline-block rounded-circle switch-bar bg-white"></div>
        </div>
        <div [class]="applyStyle(isOpen, activeClass)">
            <ng-content></ng-content>
        </div>
    </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent),
            multi: true,
        },
    ],
})
export class SwitchComponent extends FormDirective {
    @Input() values: { open: any; close: any };

    @Input()
    set value(v: { open: any; close: any }) {
        this.values = v;
    }

    get value(): { open: any; close: any } {
        return this.values;
    }

    @Input() activeClass!: string;
    @Input() color: string;

    @Output() checkedChange = new EventEmitter<boolean>(false);

    mValue: any;

    get isOpen(): boolean {
        return this.mValue === this.values.open;
    }

    constructor(private configService: ConfigService) {
        super();
        this.values = { open: true, close: false };
        this.mValue = false;
        this.color = this.configService.config.defaultColor;
    }

    writeValue(value: any): void {
        this.mValue = value;
    }

    toggle(): void {
        if (this.isDisabled) {
            return;
        }
        this.checkedChange.emit(this.isOpen);
        this.mValue = this.isOpen ? this.values.close : this.values.open;
        this.changeHandle && this.changeHandle(this.mValue);
    }
}
