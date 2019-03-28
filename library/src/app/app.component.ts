import { Component } from '@angular/core';
import { FileItem, UploadConfig } from 'projects/ng-tui/src/public_api';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() { }

    fileSrcs: FileItem[] = [
        { src: '资源地址', name: '图片名称', type: 'image/jpeg' },
    ];

    config: UploadConfig = {
        progresser: file => interval(100).pipe(
            take(100),
            map<number, number | string>(res => res >= 99 ? '文件地址' : res)
        )
    };

    options = {
        language: 'zh-cn',
    };

    myDate = 2018;

    content = `<p class="text-red">1112222</p>`;
}
