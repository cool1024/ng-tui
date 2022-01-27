import { Component, Input } from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';

@Component({
    selector: 'ts-timeline',
    templateUrl: './timeline.html',
    styleUrls: ['./timeline.scss']
})
export class TimelineComponent extends ThemeDirective {
    constructor(private configService: ConfigService) {
        super();
        this.color = this.configService.config.defaultColor;
    }
}
