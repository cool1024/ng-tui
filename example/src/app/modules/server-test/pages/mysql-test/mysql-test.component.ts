/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   mysql-test.component.ts
 * @date   2018-12-14 14:42:14
 */
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-tui';
import { WriteTestModalComponent } from './write-test-modal.component';

@Component({
    templateUrl: './mysql-test.component.html',
    styleUrls: ['./mysql-test.component.scss']
})
export class MysqlTestComponent implements OnInit {

    constructor(private modal: ModalService) { }

    ngOnInit() {

    }

    showWriteTestModal() {
        const modalHandle = this.modal.create(WriteTestModalComponent, { center: true });
        modalHandle.open().subscribe(params => {

        });
    }
}
