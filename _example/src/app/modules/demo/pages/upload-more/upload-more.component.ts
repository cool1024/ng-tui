/**
 * 更多文件上传页面
 *
 * @author xiaojian
 * @file   upload-more.component.ts
 * @date   2018-8-31 20:35:52
 */
import { Component } from '@angular/core';
import { GlobalService, RequestService } from '../../../../cores/services';
import { UploadConfig, FileItem } from 'ng-tui';
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
        },
        // 参考例子，file为要上传的文件对象
        // progresser: file => this.request.progresser('文件的上传地址', { name: '接口参数名称', file: file })
    };

    moreUploadConfig = {
        progresser: file => this.request.ossUploadRequest('/managerapi/quill', file, true)
    };

    fileItems: FileItem[] = [
        {
            src: '文件的访问地址',
            type: 'image/jpeg',
            name: '一张图片'
        },
        {
            src: '文件的访问地址',
            type: 'application/pdf',
            name: '一个PDF文件'
        },
        {
            src: '文件的访问地址',
            type: 'audio/mp3',
            name: '一个音频文件'
        }
    ];

    fileItem: FileItem = null;

    theads: string[] = [];

    tbodys: { [key: string]: string }[] = [];

    sourceUrl = '';

    constructor(public global: GlobalService, private request: RequestService) { }

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
            this.funCheckJson(result[0]);
            return;
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

    funCheckJson(soureArray: Array<any>) {
        const mapData = soureArray.map(item => ({ value: item['编号'], label: item['名称'], level: item['分类'] }));
        const levelData = [
            mapData.filter(item => item.level === '门类'),
            mapData.filter(item => item.level === '大类'),
            mapData.filter(item => item.level === '中类'),
            mapData.filter(item => item.level === '子类'),
        ];
        const data = levelData[0].map(item => Object.assign(item, { children: this.getChildren(item.value, levelData[1], levelData[2], levelData[3]) }));
        console.log(data);
        localStorage.setItem('json', JSON.stringify(data));
    }

    _funCheckJson(soureArray: Array<any>) {
        const mapData = soureArray.map(item => ({ value: item['代码编号'], label: item['代码名称'], text: item['备注'] }));
        const data = [];
        mapData.forEach(item => {
            if (item.text === '节点不能选') {
                data.push(Object.assign(item, { children: [] }));
            } else {
                data[data.length - 1] && data[data.length - 1].children.push(item);
            }
        });
        localStorage.setItem('json', JSON.stringify(data));
    }

    getChildren(parentKey: string, childrenData: Array<any>, nextChildrenData: Array<any>, endChildrenData: Array<any>) {
        return childrenData.filter(child => ~child.value.indexOf(parentKey))
            .map(child => Object.assign(child, {
                children: nextChildrenData.filter(nextChild => ~nextChild.value.indexOf(child.value))
                    .map(nextChild => Object.assign(nextChild, { children: endChildrenData.filter(endChild => ~endChild.value.indexOf(nextChild.value)) }))

            }));
    }
}
