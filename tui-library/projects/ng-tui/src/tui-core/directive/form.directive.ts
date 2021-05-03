import { ControlValueAccessor } from '@angular/forms';
import { ThemeDirective } from './theme.directive';
import { Directive } from '@angular/core';

@Directive()
export class FormDirective extends ThemeDirective implements ControlValueAccessor {
    isDisabled: boolean;

    changeHandle!: (value: any) => {};

    touchedHandle!: (value: any) => {};

    constructor() {
        super();
        this.isDisabled = false;
    }

    writeValue(value: any): void {}

    registerOnChange(fn: any): void {
        this.changeHandle = fn;
    }

    registerOnTouched(fn: any): void {
        this.touchedHandle = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
