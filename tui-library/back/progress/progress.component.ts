import { Component, Input } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-progress',
    template: `
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" [ngClass]="bgClass" [ngStyle]="{width:value+'%'}">
            {{progress}}
        </div>
    </div>`
})
export class ProgressComponent extends BaseTheme {

    @Input() value: number;

    get progress() { return `${this.value}%`; }

    constructor(private configService: ConfigService) {
        super();
        this.value = 0;
        this.color = this.configService.config.defaultColor;
    }
}
