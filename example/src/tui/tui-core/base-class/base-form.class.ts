import { ControlValueAccessor } from '@angular/forms';

export class BaseForm implements ControlValueAccessor {

    isDisabled: boolean;

    changeHandle: (value: any) => {};

    touchedHandle: (value: any) => {};

    constructor() {
        this.isDisabled = false;
    }

    writeValue(value: any) { }

    registerOnChange(fn: any) { this.changeHandle = fn; }

    registerOnTouched(fn: any) { this.touchedHandle = fn; }

    setDisabledState(isDisabled: boolean) { this.isDisabled = isDisabled; }
}
