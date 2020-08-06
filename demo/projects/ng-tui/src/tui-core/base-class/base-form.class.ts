import { ControlValueAccessor } from '@angular/forms';
import { BaseTheme } from './base-theme.class';
import { Directive } from '@angular/core';

@Directive()
export class BaseForm extends BaseTheme implements ControlValueAccessor {

    isDisabled: boolean;

    changeHandle: (value: any) => {};

    touchedHandle: (value: any) => {};

    constructor() {
        super();
        this.isDisabled = false;
    }

    writeValue(value: any) { }

    registerOnChange(fn: any) { this.changeHandle = fn; }

    registerOnTouched(fn: any) { this.touchedHandle = fn; }

    setDisabledState(isDisabled: boolean) { this.isDisabled = isDisabled; }
}
