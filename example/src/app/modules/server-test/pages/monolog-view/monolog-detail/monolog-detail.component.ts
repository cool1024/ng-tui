/**
 * 日志详情窗口
 *
 * @author 填写作者
 * @file   monolog-detail.component.ts
 * @date   2018-12-21 16:06:17
 */
import { Component, OnInit } from '@angular/core';
import { WindowViewService } from 'ng-tui';
import { RequestService } from 'src/app/cores/services';
import { AppConfig } from 'src/app/configs/app.config';

@Component({
    templateUrl: './monolog-detail.component.html',
})
export class MonologDetailComponent implements OnInit {

    logFile: string;

    logs = new Array<{ time: string, type: string, content: string }>();

    constructor(
        public view: WindowViewService,
        private request: RequestService,
    ) { }

    ngOnInit() {
        this.request.get('/phpunit', { log: this.logFile, password: AppConfig.DEV_CONFIG.DEV_PASSWORD })
            .subscribe(res => {
                const dataStr: string = res.datas;
                const logs = dataStr.split('\n');
                logs.pop();
                this.logs = logs.map(log => {
                    return {
                        time: log.split('API_TEST_RESULT')[0],
                        type: '',
                        content: ''
                    };
                });
            });
    }

    formatLog(log: string) {
    }
}
