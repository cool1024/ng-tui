import {
    Component,
    EventEmitter,
    Input,
    Output,
    AfterViewInit,
} from '@angular/core';
import { TabsDirective } from './tab.directive';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Component({
    selector: 'ts-tabs',
    template: `
    <ul class="nav nav-tabs" [class.justify-content-end]="position==='end'" [class.justify-content-center]="position==='center'">
        <li *ngFor="let tab of tabs" class="nav-item pointer">
            <span class="nav-link nav-link-{{color}}"
                [class.active]="tab===activeTab"
                (click)="changeTab(tab)">{{tab}}</span>
        </li>
    </ul>`
})
export class TabComponent extends BaseTheme implements AfterViewInit {

    @Input() tabs: Array<string>;

    @Input() activeTab: string;

    @Input() position: string;

    @Input() target: TabsDirective;

    @Output() tabChange = new EventEmitter<string>();

    constructor(private configService: ConfigService) {
        super();
        this.color = configService.config.defaultColor;
    }

    ngAfterViewInit() {
        if (this.target) {
            this.target.changeTab(this.activeTab || null);
        }
    }

    changeTab(tab: string) {
        this.activeTab = tab;
        if (this.target) {
            this.target.changeTab(this.activeTab || null);
        }
        this.tabChange.emit(tab);
    }
}
