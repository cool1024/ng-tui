import { Component } from '@angular/core';
import { GlobalService } from './core/services/global.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {


    constructor(
        public global: GlobalService
    ) {


        // 载入系统默认配置参数
        this.global.appendValuesToParams({
            dashboardMode: 'full',
            menuMode: 'small',
        });
    }
}
