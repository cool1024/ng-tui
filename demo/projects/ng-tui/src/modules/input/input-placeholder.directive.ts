import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Util } from './../../tui-core/util';

@Directive({
    selector: 'tsPlaceholder'
})
export class InputPlaceholder implements OnChanges {

    @Input() content: String;
    @Input() tsPlaceholder: String;

    text = '';
    showPlaceholder = false;

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.hasOwnProperty('content')){
            const value = changes.content.currentValue;
            this.showPlaceholder =  Util.notNullAndEmpty(value);
            this.text = value || this.tsPlaceholder;
        }
    }

}