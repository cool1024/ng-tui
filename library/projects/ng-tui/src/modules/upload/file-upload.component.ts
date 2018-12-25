
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { styleStr } from './upload.data';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { InputImages } from './input-images.class';

@Component({
    selector: 'ts-upload',
    templateUrl: 'file-upload.component.html',
})

export class FileUploadComponent extends BaseTheme implements OnChanges {

    @Input() src = '';

    @Input() title = '';

    @Input() config: UploadConfig;

    private uploadFiles = new InputImages();

    get source(): string { return this.config ? (this.config.host || '') : ''; }

    get query(): string { return this.config ? (this.config.queryString || '') : ''; }

    constructor() {
        super();
        this.color = 'white';
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    addNewFilesTopUpload(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            this.uploadFile(files[i]);
        }
    }

    uploadFile(file: File) {
        const url = window.URL.createObjectURL(file);
        const index = this.uploadFiles.push({ type: 'file', file, url, uploading: true });
        if (!this.config) {
            console.error('need config param:需要设置config参数');
            return;
        } else if (!this.config.progresser) {
            console.error('need config.progresser param:需要设置进度上传参数');
            return;
        }
        this.config.progresser(file).subscribe(res => {
            if (typeof res === 'string') {
                this.uploadFiles.updateProgress(index, 100);
                this.uploadFiles.updateItem(index, {
                    type: 'url',
                    uploading: false,
                    src: res,
                });
            } else if (typeof res === 'boolean') {
                this.uploadFiles.updateItem(index, { error: true });
            } else {
                this.uploadFiles.updateProgress(index, res);
            }
        });
    }

}
