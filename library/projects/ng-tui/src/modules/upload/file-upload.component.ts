
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { InputImages, FileItem } from './input-images.class';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { InputFileDirective } from './input-file.directive';

@Component({
    selector: 'ts-upload',
    templateUrl: 'file-upload.component.html',
})

export class FileUploadComponent extends BaseTheme implements OnChanges, AfterViewInit {

    @Input() multiple: string;

    @Input() src = new Array<FileItem>();

    @Input() title = '';

    @Input() config: UploadConfig;

    @Output() srcChange = new EventEmitter<FileItem[]>();

    @ViewChild('fileDom') inputFile: InputFileDirective;

    uploadFiles = new InputImages();

    noInputChange = false;

    get source(): string { return this.config ? (this.config.host || '') : ''; }

    get query(): string { return this.config ? (this.config.queryString || '') : ''; }

    getUrl(image: { type: string, file: File, url: string, uploading: boolean }): SafeUrl {
        if (image.type === 'file') {
            return this.domSanitizer.bypassSecurityTrustUrl(image.url);
        } else {
            return image.url ? this.source + image.url : '';
        }
    }

    constructor(private domSanitizer: DomSanitizer) {
        super();
        this.color = 'white';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.noInputChange) {
            this.noInputChange = false;
            return;
        }
        this.uploadFiles = new InputImages();
        this.src.forEach(fileItem => {
            this.uploadFiles.push({
                type: 'url',
                file: fileItem,
                url: fileItem.src,
                uploading: false
            });
        });
    }

    ngAfterViewInit() {
        // tslint:disable-next-line:no-unused-expression
        this.isApply(this.multiple) && this.inputFile.inputDom.setAttribute('multiple', 'multiple');
    }

    removeFile(i: number) {
        this.noInputChange = true;
        this.uploadFiles.remove(i);
        this.srcChange.emit(this.uploadFiles.toFileItemArray());
    }

    addNewFilesTopUpload(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            this.uploadFile(files[i]);
        }
    }

    uploadFile(file: File) {
        const url = window.URL.createObjectURL(file);
        const item = this.uploadFiles.push({ type: 'file', file, url, uploading: true });
        if (!this.config) {
            console.error('need config param:需要设置config参数');
            return;
        } else if (!this.config.progresser) {
            console.error('need config.progresser param:需要设置进度上传参数');
            return;
        }
        this.config.progresser(file).subscribe(res => {
            if (typeof res === 'string') {
                item.progress = 100;
                item.type = 'url';
                item.uploading = false;
                item.url = res;
                this.noInputChange = true;
                this.srcChange.emit(this.uploadFiles.toFileItemArray());
            } else if (typeof res === 'boolean') {
                item.error = true;
            } else {
                item.progress = res;
            }
        });
    }

}
