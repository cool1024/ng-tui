/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   api-test.component.ts
 * @date   2018-12-20 17:28:27
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-tui';
import { ApiHeaderComponent } from './api-header.component';

@Component({
    templateUrl: './api-test.component.html',
    styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {

    constructor(private modal: ModalService) { }

    ngOnInit() {

    }

    /**
     * 打开请求头编辑窗口
     */
    showHeaderEditModal() {
        const modalHandle = this.modal.create(ApiHeaderComponent, { center: true });
        modalHandle.open().subscribe(res => {

        });
    }
}
