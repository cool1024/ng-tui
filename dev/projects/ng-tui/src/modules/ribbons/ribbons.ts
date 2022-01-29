import { Component, Input } from '@angular/core';
import { TUI_CONST } from '../../tui-core/const';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { ConfigService } from '../../tui-core/service/config.service';

const POSITION = TUI_CONST.POSITION;

@Component({
    selector: 'ts-ribbons',
    templateUrl: './ribbons.html',
    styleUrls: ['./ribbons.scss']
})
export class RibbonsComponent extends ThemeDirective {

    @Input() position: string;

    @Input() icon: string;

    @Input() tag: string;

    @Input() title: string;

    get revPosition(): string {
        if (this.isApply(this.position)) {
            return this.position === POSITION.START ? POSITION.END : POSITION.START;
        } else {
            return POSITION.START;
        }
    }

    get hasPosition(): boolean {
        return this.isApply(this.position);
    }

    constructor(private configService: ConfigService) {
        super();
        this.color = this.configService.config.defaultColor;
        this.tag = '';
        this.title = '';

    }
}