import { Input, Component } from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-side-tabs',
    exportAs: 'tsSideTabs',
    template: `
    <div class="tabs-side tabs-{{color}} flex-column">
        <div class="side-bar"
            [style.width.px]="tabBarWidth"
            [style.left.px]="offsetLeft">
        </div>
        <ng-content></ng-content>
    </div>`,
})
export class SideTabsComponent extends BaseTheme {

    tabBarWidth = 0;
    offsetTop = 0;

    constructor(configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }
}

@Component({
    selector: 'ts-tab',
    template: `<div class="tab w-100"><ng-content></ng-content></div>`
})
export class TabComponent {
    @Input() value: any;
}
