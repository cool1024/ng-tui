import { Component } from '@angular/core';
import { TabItem } from 'projects/ng-tui/src/public_api';

@Component({
    templateUrl: './tabs.component.html'
})
export class TabsComponent {
    tabItems = ['Home', 'Profile', 'Messages'];
    tabIconItems: TabItem[] = [
        { icon: 'iconfont icon-chakan', text: 'Profile' }
    ];
}