
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { FileItem } from './input-images.class';

@Component({
    selector: 'ts-file-card',
    template: `
    <div class="border p-1 rounded" style="width:130px;height:130px;">
    <input #fileDom="tsFile" tsFile (fileChange)="uploadFile($event)" type="file">
        <div *ngIf="src;else openPad" class="bg-dark-hover pointer">
            <div style="background-size: contain;height:100px;background-position: center;" [style.backgroundImage]="backgroundImage">
                <div class="h-100 d-flex align-items-center justify-content-center">
                    <i (click)="src=null" class="iconfont icon-delete"></i>
                </div>
            </div>
            <div style="height:20px" class="position-relative">
                <div *ngIf="uploaded>=0" class="progress mx-1" style="height:2px;">
                    <div class="progress-bar" style="width: 25%;"></div>
                </div>
                <div class="position-absolute text-center text-muted text-truncate w-100 h-100">1111111111测试文档.doc</div>
            </div>
        </div>
        <ng-template #openPad>
            <div (click)="fileDom.openFileDialog()" class="h-100 pointer d-flex justify-content-center align-items-center">
                <div class="text-muted"><i class="iconfont icon-folder mr-1"></i>{{title}}</div>
            </div>
        </ng-template>
    </div>`
})

export class FileCardComponent implements OnChanges {

    @Input() config: UploadConfig;
    @Input() src: FileItem;
    @Input() title: string;

    @Output() fileChange = new EventEmitter<File>(false);
    @Output() srcChange = new EventEmitter<FileItem>(false);

    @ViewChild('input_file') inputFile: ElementRef;

    backgroundImage = '';
    uploaded = -1;

    fileTypeImage(file: File): string {
        const types = file.type.split('/');
        let typeImage = 'assets/file-icon/';
        switch (types[0]) {
            case 'image': typeImage += 'image.png'; break;
            case 'video': typeImage += 'video.png'; break;
            case 'audio': typeImage += 'rudio.png'; break;
            case 'application': switch (types[1]) {
                case 'pdf': typeImage += 'pdf.png'; break;
                case 'x-iwork-pages-sffpages': typeImage += 'word.png'; break;
            }break;
        }
        return `url(${typeImage})`;
    }

    constructor() {
        this.title = 'Click...';
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    uploadFile(file: File) {
        this.backgroundImage = this.fileTypeImage(file);
        this.src = {
            name: file.name,
            src: window.URL.createObjectURL(file),
        };
    }

}
