import { Component, OnInit } from '@angular/core';
import { Badge } from 'ng-tui';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

    badges: Badge[] = [
        {
            badgeLabel: '西瓜',
            badgeColor: 'success',
        },
        {
            badgeLabel: '苹果',
            badgeColor: 'danger',
        },
        {
            badgeLabel: '香蕉',
            badgeColor: 'warning',
        },
        {
            badgeLabel: '草莓',
            badgeColor: 'pink',
        },
        {
            badgeLabel: '葡萄',
            badgeColor: 'purple',
        },
    ];
    constructor() { }

    ngOnInit() {
    }

    /**
     * 关闭一个标签
     * @param badge 徽章
     */
    closeBadge(badge: Badge) {
        this.badges.splice(this.badges.indexOf(badge), 1);
    }

    /**
     * 发送删除标签请求
     * @param badge 徽章
     */
    sendRemoveRequest(badge: Badge) {
        console.log(badge);
    }

}
