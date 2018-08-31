
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { styleStr } from './upload.data';

@Component({
    selector: 'ts-image-card',
    template: `
    <div class="d-inline-block rounded border-muted align-top"
        [class.p-1]="usePadding"
        [class.border]="useBorder"
        [class.border-muted]="useBorder"
        [ngStyle]="blockStyle">
        <input #input_file class="d-none" type="file" accept="image/*" (change)="changeFile($event.target.files);input_file.value=null">
        <div  *ngIf="!((!showImage&&!src)||isLoading)" class="w-100 h-100 upload-block" [ngStyle]="{'background-image': getUrl()}">
            <div class="upload-block-window text-white text-center h-100 w-100" [ngStyle]="windowStyle">
                <i *ngIf="useView" (click)="showImageView()" class="iconfont icon-browse pointer mr-1"></i>
                <i (click)="cleanInput(input_file)" class="iconfont icon-delete pointer"></i>
            </div>
        </div>
        <div *ngIf="(!showImage&&!src)&&!isLoading" (click)="input_file.click()" class="w-100 h-100 upload-block">
            <div class="text-muted text-center h-100 w-100 pointer" [ngStyle]="windowStyle">
                <i class="iconfont icon-pic mr-1"></i>{{title}}
            </div>
        </div>
        <div *ngIf="isLoading" class="w-100 h-100">
            <div class="typing_loader"></div>
        </div>
    </div>`,
    styles: [styleStr]
})

export class ImageCardComponent implements OnChanges {

    @Input() config: UploadConfig;
    @Input() src: string | { blobUrl: string };
    @Input() title: string;
    @Input() width: number;
    @Input() useBorder: boolean;
    @Input() usePadding: boolean;
    @Input() useView: boolean;

    @Output() fileChange = new EventEmitter<File>(false);
    @Output() srcChange = new EventEmitter<string>(false);
    @Output() viewHandle = new EventEmitter<any>(false);

    @ViewChild('input_file') inputFile: ElementRef;

    showImage = false;
    isLoading = false;
    hasUpload = true;
    default: string;
    file: File;

    get source(): string { return this.config ? (this.config.host || '') : ''; }

    get query(): string { return this.config ? (this.config.queryString || '') : ''; }

    get realSrc(): string {
        return typeof this.src === 'string' ? this.source + this.src + this.query : this.src.blobUrl;
    }

    get sizePx(): string {
        return this.width + 'px';
    }

    get blockStyle(): any {
        return { height: this.sizePx, width: this.sizePx };
    }

    get windowStyle(): any {
        return { lineHeight: (this.width - (this.usePadding ? 9 : 0)) + 'px' };
    }

    constructor() {
        this.width = 130;
        this.default = '';
        this.title = 'Click...';
        this.useBorder = true;
        this.usePadding = true;
        this.useView = false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.src && !this.default) { this.default = changes.src.currentValue; }
    }

    getUrl() {
        return `url(${this.realSrc})`;
    }

    changeFile(files: File[]) {
        this.hasUpload = false;
        this.isLoading = false;
        this.file = files[0];
        if (files.length > 0) {
            this.fileChange.emit(files[0]);
            this.src = { blobUrl: window.URL.createObjectURL(files[0]) };
            this.showImage = true;
            if (!!this.config) {
                if (this.config.uploader) { this.uploadFile(); }
            }
        }
    }

    cleanInput(input: HTMLInputElement) {
        this.src = '';
        this.showImage = false;
        this.isLoading = false;
        this.hasUpload = true;
        this.file = null;
        input.value = '';
        this.srcChange.emit(this.src);
    }

    uploadFile() {
        if (this.hasUpload === true) { return; }
        if (this.file === null || this.file === undefined) { return; }
        this.hasUpload = true;
        this.isLoading = true;
        if (this.config.uploader !== undefined || this.config.uploader !== null) {
            this.config.uploader(this.file).subscribe(src => {
                this.isLoading = false;
                this.src = src;
                if (src === '') {
                    this.showImage = false;
                }
                this.srcChange.emit(src);
            });
        }
    }

    showImageView() {
        this.viewHandle.emit(this.src);
    }
}
