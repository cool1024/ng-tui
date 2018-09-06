/**
 * 更多文件上传页面
 *
 * @author xiaojian
 * @file   upload-more.component.ts
 * @date   2018-8-31 20:35:52
 */
import { Component } from '@angular/core';
import { GlobalService } from '../../../../cores/services';
import { UploadConfig } from 'ng-tui';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
    templateUrl: './upload-more.component.html',
    styleUrls: ['./upload-more.component.scss']
})
export class UploadMoreComponent {

    uploadConfig: UploadConfig = {
        host: '',
        progresser: file => {
            return interval(100).pipe(
                take(101),
                map<number, number | string>((res) => res < 100 ? res : 'https://cool1024.com/upload/47e0b428f30fde9a0395b18e6db62ddd.mp4')
            );
        }
    };

    theads: string[] = [];

    tbodys: { [key: string]: string }[] = [];

    sourceUrl = '';

    constructor(public global: GlobalService) { }

    /**
     * Excel文件读取
     */
    readExcel(file: File) {
        this.theads = [];
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            const data = new Uint8Array(<any>reader.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const result = new Array<any>();
            workbook.SheetNames.forEach(sheetName => {
                const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                if (roa.length) {
                    result.push(roa);
                    console.log(JSON.stringify(roa));
                }
            });
            try {
                for (const key in result[0][0]) {
                    if (result[0][0].hasOwnProperty(key)) {
                        this.theads.push(key);
                    }
                }
                this.tbodys = result[0];
            } catch (error) {
                console.error(error);
            }
        });
        reader.readAsArrayBuffer(file);
    }
}
