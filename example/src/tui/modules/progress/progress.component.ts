import { Component, Input } from '@angular/core';
import { DomAttr } from './../../commons/extends/attr.class';

@Component({
    selector: 'ts-progress',
    template: `
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" [ngClass]="bgClass" [ngStyle]="{width:value+'%'}">
            {{progress}}
        </div>
    </div>`
})
export class ProgressComponent extends DomAttr {

    @Input() value: number;

    constructor() {
        super();
        this.value = 0;
    }

    get progress() {
        return `${this.value}%`;
    }
}
