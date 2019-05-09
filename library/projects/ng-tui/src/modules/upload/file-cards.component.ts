
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { FileItem } from './input-images.class';

@Component({
    selector: 'ts-file-cards',
    template: `
        <div class="d-flex flex-wrap">
            <ts-file-card
                class="mr-2 mb-2"
                *ngFor="let fileItem of src;index as i"
                [(src)]="src[i]"
                [config]="config"
                [title]="title"
                (itemClick)="sendClick($event)"
                (fileDelete)="src.splice(i,1)"
                (srcChange)="sendChange()">
            </ts-file-card>
            <ts-file-card
                class="mb-2"
                [title]="title"
                (fileChange)="addFileCard($event)">
            </ts-file-card>
        </div>
    `
})

export class FileCardsComponent implements OnChanges {

    @Input() config: UploadConfig;
    @Input() src: FileItem[];
    @Input() title: string;

    @Output() itemClick = new EventEmitter<FileItem>(false);
    @Output() fileChange = new EventEmitter<File>(false);
    @Output() srcChange = new EventEmitter<FileItem[]>(false);

    constructor() {
        this.title = 'Click...';
        this.src = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes.src.currentValue);
    }

    addFileCard(file: File) {
        this.src.push({ file });
        // console.log(file);
    }

    sendChange() {
        this.srcChange.emit(this.src);
    }

    sendClick($event: FileItem) {
        this.itemClick.emit($event);
    }
}
