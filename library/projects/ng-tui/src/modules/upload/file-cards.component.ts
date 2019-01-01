
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadConfig } from './upload.interface';
import { FileItem } from './input-images.class';

@Component({
    selector: 'ts-file-cards',
    template: ``
})

export class FileCardsComponent implements OnChanges {

    @Input() config: UploadConfig;
    @Input() src: FileItem[];
    @Input() title: string;

    @Output() fileChange = new EventEmitter<File>(false);
    @Output() srcChange = new EventEmitter<FileItem>(false);

    constructor() {
        this.title = 'Click...';
    }

    ngOnChanges(changes: SimpleChanges): void {

    }
}
