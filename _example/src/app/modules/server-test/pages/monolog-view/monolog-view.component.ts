/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   monolog-view.component.ts
 * @date   2018-12-21 15:43:34
 */
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/cores/services';
import { AppConfig } from 'src/app/configs/app.config';
import { WindowService } from 'ng-tui';
import { MonologDetailComponent } from './monolog-detail/monolog-detail.component';

@Component({
    templateUrl: './monolog-view.component.html',
    styleUrls: ['./monolog-view.component.scss']
})
export class MonologViewComponent implements OnInit {

    tableRows = [];

    constructor(
        private request: RequestService,
        private window: WindowService,
    ) { }

    ngOnInit() {
        this.request.get('/phpunit', { password: AppConfig.DEV_CONFIG.DEV_PASSWORD })
            .subscribe(res => this.tableRows = res.datas);

    }

    showLogDetail(logName: string) {
        const windowHandle = this.window.push(MonologDetailComponent);
        windowHandle.instance.logFile = logName;
        windowHandle.present();
    }
}
