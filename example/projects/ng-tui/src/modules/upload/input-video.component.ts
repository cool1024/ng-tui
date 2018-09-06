import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UploadConfig } from './upload.interface';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ts-video',
    template: `
    <div class="d-flex flex-column" [ngStyle]="videoStyle">
        <input #input_file type="file" class="d-none"
        [attr.accept]="type+'/*'" (change)="changeFile($event.target.files);input_file.value=null">
        <div *ngIf="!showMediaDom; else mediaDom" (click)="input_file.click()"
            class="pointer text-muted border d-flex align-items-center justify-content-center"
            style="border-style:dashed !important;border-width:1px;height:100px;">
            <i *ngIf="type!=='audio'" class="iconfont icon-video mr-2"></i>
            <i *ngIf="type=='audio'" class="iconfont icon-music mr-2"></i>
            <span>{{title}}</span>
        </div>
        <ng-template #mediaDom>
            <video *ngIf="type!=='audio'" class="m-0 p-0 w-100 flex-grow-1" [src]="realSrc" controls></video>
            <audio *ngIf="type=='audio'" class="m-0 p-0 w-100 flex-grow-1" [src]="realSrc" controls></audio>
        </ng-template>
        <div *ngIf="showMediaDom" class="flex-shrink-0 text-right p-2 d-flex justify-content-end align-items-center">
            <div *ngIf="showLoading" class="flex-grow-1 mr-2">
                <div class="progress">
                    <div class="progress-bar bg-{{color}}" [style.width]="loaded"></div>
                </div>
            </div>
            <div class="flex-shrink-0 d-flex">
                <div *ngIf="needUpload" class="text-primary-hover pointer mr-2">
                    <span *ngIf="showLoading">
                        <i class="iconfont icon-loading iconfont-rotate mr-1"></i>
                    </span>
                    <span *ngIf="!showLoading" (click)="tryUpload()">
                        <i class="iconfont icon-upload mr-1"></i>上传
                    </span>
                </div>
                <span *ngIf="!needUpload" (click)="tryUpload()" class="text-success mr-2">
                    <i class="iconfont icon-check mr-1"></i>就绪
                </span>
                <span (click)="cleanInput()" class="text-danger-hover pointer">
                    <i class="iconfont icon-delete mr-1"></i>清空
                </span>
            </div>
        </div>
    </div>
    `
})
export class InputVideoComponent implements OnChanges {

    @Input() src: string | SafeResourceUrl;

    @Input() videoSize: [number, number];

    @Input() title: string;

    @Input() type: string;

    @Input() autoUpload: boolean;

    @Input() useUpload: boolean;

    @Input() config: UploadConfig;

    @Input() color: string;

    @Output() fileChange = new EventEmitter<File>();

    @Output() srcChange = new EventEmitter<string>();

    showMediaDom = false;

    showLoading = false;

    hasUpload = false;

    needUpload = false;

    loaded = '0%';

    file: File;

    subscription: Subscription;

    get videoStyle(): Object {
        return {
            width: `${this.videoSize[0]}px`,
            maxHeight: `${this.videoSize[1]}px`,
            fontSize: '1rem'
        };
    }

    get source(): string { return this.config ? (this.config.host || '') : ''; }

    get realSrc(): string | SafeResourceUrl { return typeof this.src === 'string' ? this.source + this.src : this.src; }

    constructor(private sanitizer: DomSanitizer, private configService: ConfigService) {
        this.type = 'video';
        this.videoSize = [260, 200];
        this.autoUpload = false;
        this.useUpload = true;
        this.color = this.configService.config.defaultColor;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.src && changes.src.currentValue) {
            // tslint:disable-next-line:no-unused-expression
            this.type === 'audio' && (this.videoSize[1] = 100);
            this.showMediaDom = true;
            this.src = !changes.src.firstChange ? changes.src.currentValue : this.src;
        }
    }

    changeFile(files: File[]) {
        if (files.length > 0) {
            this.needUpload = true;
            this.file = files[0];
            this.fileChange.emit(files[0]);
            this.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(files[0]));
            this.showMediaDom = true;
            this.hasUpload = false;
            this.showLoading = false;
            if (!!this.config && this.config.progresser && !this.useUpload) {
                this.tryUpload();
            }
        }
    }

    cleanInput() {
        if (this.showLoading && this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
            this.showLoading = false;
        } else {
            this.src = '';
            this.showMediaDom = false;
            this.hasUpload = true;
            this.file = null;
            this.fileChange.emit(null);
        }
        this.needUpload = false;
    }

    tryUpload() {
        if (this.hasUpload === true) { return; }
        if (this.file === null || this.file === undefined) { return; }
        this.hasUpload = true;
        this.loaded = '0%';
        this.subscription = this.config.progresser(this.file).subscribe(res => {
            if (typeof res === 'string') {
                this.src = res;
                this.showLoading = false;
                this.needUpload = false;
                this.srcChange.emit(res);
            } else {
                this.loaded = res + '%';
            }
        });
        this.showLoading = true;
    }
}
