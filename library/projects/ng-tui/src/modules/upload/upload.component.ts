import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from '../../tui-core/base-services/config.service';
import { FileItem, UploadItem } from './upload.class';

@Component({
    selector: 'ts-upload',
    exportAs: 'tsUpload',
    templateUrl: './upload.html'
})
export class UploadComponent {

    @Input() uploader: (file: File) => Observable<number | string>;

    @Input() src: string;

    @Input() size: number;

    @Input() baseUrl: string;

    @Output() srcChange = new EventEmitter<string>(true);

    item: UploadItem;

    dps: Subscription;

    get sizeStyle() {
        const pxStr = (this.size || this.configService.config.uploadItemSize) + 'px';
        return {
            width: pxStr,
            height: pxStr
        };
    }

    get previewSize() {
        const pxStr = ((this.size || this.configService.config.uploadItemSize) - 26) + 'px';
        return {
            height: pxStr,
        };
    }

    get previewStyle() {
        return {
            backgroundImage: `url(${this.item ? this.getThumb() : ''})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        };
    }

    constructor(private configService: ConfigService) { }

    uploadItem(file: File) {
        if (this.dps && (!this.dps.closed)) {
            this.dps.unsubscribe();
        }
        const fileItem = FileItem.createFromFile(file);
        this.item = new UploadItem(fileItem);
        if (this.uploader) {
            this.item.setUploading();
            this.dps = this.uploader(file).subscribe(res => {
                if (res === -1) {
                    this.dps.unsubscribe();
                    this.item.setError();
                } else {
                    typeof res === 'string' ? (this.item.setComplete(res), this.dps.unsubscribe()) : this.item.setProgress(res);
                }
            });
        } else {
            console.error('you need bind an uploader');
        }
    }

    getThumb(): string {
        const fileType = this.item.fileItem.type;
        const types = fileType.split('/');
        let typeImage = 'assets/file-icon/';
        switch (types[0]) {
            case 'image': typeImage = this.item.uploading ? URL.createObjectURL(this.item.fileItem.file) : (this.baseUrl || '' + this.item.fileItem.src); break;
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
        return typeImage;
    }
}