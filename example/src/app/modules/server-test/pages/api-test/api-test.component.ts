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
        modalHandle.instance.requestHeaders = JSON.stringify(this.global.getValue('apiTest.headers', {}));
        modalHandle.open().subscribe(headers => this.global.setValue('apiTest.headers', headers));
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
