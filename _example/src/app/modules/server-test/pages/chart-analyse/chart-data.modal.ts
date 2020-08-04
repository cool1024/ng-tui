/**
 * 图表数据编辑
 *
 * @author cool1024
 * @file   write-test-modal.component.ts
 * @date   2018-12-14 14:49:08
 */
import { Component } from '@angular/core';
import { ModalService, ToastService } from 'ng-tui';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: 'chart-data.modal.html'
})
export class ChartDataModalComponent {

    // 数据列表
    dataRows = [
        { title: '不带索引', data: '' },
        { title: '带索引', data: '' },
    ];

    // 下标列表字符串
    labels = '';

    constructor(
        public modal: ModalService,
        private toast: ToastService,
    ) { }

    confirmSave() {
        try {
            const dataRows = this.dataRows.map(row => ({ title: row.title, data: row.data.split(',') || [] }));
            let labels = [];
            if (dataRows.length > 0) {
                for (let i = 0; i < dataRows[0].data.length; i++) {
                    labels.push(i + 1);
                }
            }
            // tslint:disable-next-line:no-unused-expression
            this.labels && (labels = this.labels.split(','));
            this.modal.close({ dataRows, labels });
        } catch (error) {
            console.log(error);
            this.toast.warning('数据错误', '图表数据必须是用逗号隔开的数字');
        }
    }

    confirmAdd(title: NgModel, data: NgModel) {
        if (title.valid && data.valid) {
            this.dataRows.push({ title: title.value, data: data.value });
            title.reset();
            data.reset();
        } else {
            this.toast.warning('数据错误', '标题和数据内容不能为空！');
        }
    }
}
