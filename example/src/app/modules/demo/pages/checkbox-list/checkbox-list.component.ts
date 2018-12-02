/**
 * 选中列表页面文件
 *
 * @author xiaojian
 * @file   checkbox-list.component.ts
 * @date   2018-9-14 11:43:06
 */
import { Component } from '@angular/core';
import { Pagination } from 'ng-tui';

@Component({
    templateUrl: './checkbox-list.component.html',
    styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent {

    page = new Pagination(0, 1, 3);

    checkBoxValues = [2, 4];

    listItems = [];

    isAllChecked = [false];

    staticDatas = [
        { text: 'A', value: 1 },
        { text: 'B', value: 2 },
        { text: 'C', value: 3 },
        { text: 'D', value: 4 },
        { text: 'E', value: 5 },
        { text: 'F', value: 6 },
    ];

    constructor() {
        this.loadDatas();
    }

    loadDatas() {
        this.isAllChecked = [false];
        this.page.total = this.staticDatas.length;
        this.listItems = this.staticDatas.slice(this.page.offset, this.page.offset + this.page.limit);
    }

    selectAllOrNone(checked: boolean) {
        if (checked) {
            // 全选
            this.listItems.forEach(targetItem => {
                // tslint:disable-next-line:no-unused-expression
                ~this.checkBoxValues.indexOf(targetItem.value) || this.checkBoxValues.push(targetItem.value);
            });
        } else {
            this.listItems.forEach(targetItem => {
                const removeIndex = this.checkBoxValues.indexOf(targetItem.value);
                // tslint:disable-next-line:no-unused-expression
                ~removeIndex && this.checkBoxValues.splice(removeIndex, 1);
            });
        }
        this.checkBoxValues = this.checkBoxValues.concat();
    }
}
