/**
 * 更多文件上传页面
 *
 * @author xiaojian
 * @file   upload-more.component.ts
 * @date   2018-8-31 20:35:52
 */
import { Component } from '@angular/core';
import { GlobalService } from '../../../../cores/services';

@Component({
    templateUrl: './upload-more.component.html',
    styleUrls: ['./upload-more.component.scss']
})
export class UploadMoreComponent {

    constructor(public global: GlobalService) { }
}
