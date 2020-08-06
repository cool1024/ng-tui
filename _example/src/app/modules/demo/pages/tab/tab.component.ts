import { Component } from '@angular/core';
import { GlobalService } from '../../../../cores/services';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent {

    tabTitles = ['全部', '下降', '增长'];

    showFlag = 0;

    tableDatas = [
        { order: 1, searchKey: '精灵', userCount: 100, changeCount: +20 },
        { order: 2, searchKey: '树叶', userCount: 200, changeCount: -20 },
        { order: 3, searchKey: '暴风雨', userCount: 300, changeCount: -30 },
        { order: 4, searchKey: '停车场', userCount: 400, changeCount: +40 },
        { order: 5, searchKey: '番剧', userCount: 500, changeCount: -50 },
        { order: 6, searchKey: '直升飞机', userCount: 600, changeCount: +42 },
    ];

    get getTableDatas() {
        return this.tableDatas.filter(item => {
            if (this.showFlag === 1) {
                return item.changeCount >= 0;
            } else if (this.showFlag === 2) {
                return item.changeCount < 0;
            } else {
                return true;
            }
        });
    }

    constructor(public global: GlobalService) { }

    setActiveFlag(tabTitle: string) {
        this.showFlag = this.tabTitles.indexOf(tabTitle);
        console.log(this.showFlag);
    }
}
