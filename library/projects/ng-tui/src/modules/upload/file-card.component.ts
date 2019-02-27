
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { FileItem } from './input-images.class';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ts-file-card',
    template: `
    <div class="border p-1 rounded" style="width:130px;height:130px;">
    <input #fileDom="tsFile" tsFile (fileChange)="uploadFile($event)" type="file">
        <div *ngIf="src;else openPad" class="upload-block-window bg-primary-hover pointer">
            <div style="background-size: 60% 80%;background-repeat: no-repeat;height:100px;background-position: center;"
                [style.backgroundImage]="backgroundImage">
                <div class="h-100 d-flex align-items-center justify-content-center">
                    <i (click)="deleteFile()" class="iconfont icon-delete text-white"></i>
                </div>
            </div>
            <div style="height:20px" class="position-relative">
                <div *ngIf="uploaded>=0" class="progress mx-1" style="height:2px;">
                    <div class="progress-bar" [style.width.%]="uploaded"></div>
                </div>
                <div class="position-absolute text-center text-muted text-truncate w-100 h-100">{{src?.name}}</div>
            </div>
        </div>
        <ng-template #openPad>
            <div (click)="fileDom.openFileDialog()" class="text-muted h-100 pointer d-flex justify-content-center align-items-center">
                <div><i class="iconfont icon-folder mr-1"></i>{{title}}</div>
            </div>
        </ng-template>
    </div>`,
    styles: [
        `.upload-block-window i{opacity:0}
         .upload-block-window:hover i{opacity:1}`
    ]
})

export class FileCardComponent implements OnChanges, OnDestroy {

    @Input() config: UploadConfig;
    @Input() src: FileItem;
    @Input() title: string;

    @Output() fileChange = new EventEmitter<File>(false);
    @Output() srcChange = new EventEmitter<FileItem>(false);
    @Output() fileDelete = new EventEmitter<void>(false);

    @ViewChild('input_file') inputFile: ElementRef;

    backgroundImage = '';
    uploaded = -1;
    subscription: Subscription;

    fileTypeImage(fileType: string): string {
        const types = fileType.split('/');
        let typeImage = 'assets/file-icon/';
        switch (types[0]) {
            case 'image': typeImage += 'image.svg'; break;
            case 'video': typeImage += 'video.svg'; break;
            case 'audio': typeImage += 'audio.svg'; break;
            case 'application': switch (types[1]) {
                case 'pdf': typeImage += 'pdf.svg'; break;
                case 'x-iwork-pages-sffpages': typeImage += 'docs.svg'; break;
                case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet': typeImage += 'excel.svg'; break;
                case 'vnd.ms-excel': typeImage += 'excel.svg'; break;
                case 'vnd.openxmlformats-officedocument.wordprocessingml.document': typeImage += 'docs.svg'; break;
                case 'msword': typeImage += 'docs.svg'; break;
                case 'json': typeImage += 'text.svg'; break;
                case 'zip': typeImage += 'zip.svg'; break;
                default: typeImage += 'other.svg';
            }break;
            case 'text': typeImage += 'text.svg'; break;
            default: typeImage += 'other.svg';
        }
        // console.log(fileType);
        return `url(${typeImage})`;
    }

    constructor() {
        this.title = 'Click...';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.src && changes.src.currentValue) {
            if (this.src.file) {
                this.uploadFile(this.src.file);
                this.src.file = null;
            } else {
                this.backgroundImage = this.fileTypeImage(this.src.type);
            }
        }
    }

    ngOnDestroy() {
        if (this.uploaded > -1 && this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    deleteFile() {
        if (this.uploaded > -1 && this.subscription) {
            this.subscription.unsubscribe();
            this.uploaded = -1;
        }
        this.src = null;
        this.fileDelete.emit();
    }

    uploadFile(file: File) {
        this.fileChange.emit(file);
        if (this.config && this.config.progresser) {
            this.backgroundImage = this.fileTypeImage(file.type);
            this.src = {
                name: file.name,
                src: window.URL.createObjectURL(file),
                type: file.type
            };
            this.uploaded = 0;
            this.subscription = this.config.progresser(file).subscribe(res => {
                if (typeof res === 'number') {
                    this.uploaded = res;
                } else {
                    this.src.src = res;
                    this.uploaded = -1;
                    this.srcChange.emit(this.src);
                }
            });
        }
    }
}
