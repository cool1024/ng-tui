import { Component, Input } from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-progress',
    template: `
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" [ngClass]="bgClass" [ngStyle]="{width:value+'%'}">
            {{progress}}
        </div>
    </div>`
})
export class ProgressComponent extends ThemeDirective {

    @Input() value: number;

    get progress(): string { return `${this.value}%`; }

    constructor(private configService: ConfigService) {
        super();
        this.value = 0;
        this.color = this.configService.config.defaultColor;
    }
}
