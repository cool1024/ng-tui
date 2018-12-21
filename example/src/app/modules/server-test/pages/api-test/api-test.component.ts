/**
 * API测试页面
 *
 * @author cool1024
 * @file   api-test.component.ts
 * @date   2018-12-20 17:28:27
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-tui';
import { ApiHeaderComponent } from './api-header.component';
import { ApiAddComponent } from './api-add.component';
import { GlobalService } from 'src/app/cores/services';

@Component({
    templateUrl: './api-test.component.html',
    styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {

    apiTestRows = [];

    constructor(
        private modal: ModalService,
        private global: GlobalService
    ) { }

    ngOnInit() {

    }

    /**
     * 打开请求头编辑窗口
     */
    showHeaderEditModal() {
        const modalHandle = this.modal.create(ApiHeaderComponent, { center: true });
        modalHandle.instance.requestHeaders = this.global.getStringFromStorage('apiTest.headers', '{}');
        modalHandle.instance.hostUrl = this.global.getStringFromStorage('apiTest.url');
        modalHandle.open().subscribe(res => {
            this.global.setObjectToStorage('apiTest.headers', res.headers);
            this.global.setValueToStorage('apiTest.url', res.url);
        });
    }

    /**
     * 显示新增测试窗口
     */
    showAddTestModal() {
        const modalHandle = this.modal.create(ApiAddComponent, { center: true });
        modalHandle.instance.modalTitle = '添加测试接口';
        modalHandle.open().subscribe(apiTest => this.apiTestRows.push(apiTest));
    }
}
