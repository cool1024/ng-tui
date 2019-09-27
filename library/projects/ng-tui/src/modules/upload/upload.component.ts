import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
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

    private item: UploadItem;

    get sizeStyle() {
        const pxStr = (this.size || this.configService.config.uploadItemSize) + 'px';
        return {
            width: pxStr,
            height: pxStr
        };
    }

    constructor(private configService: ConfigService) { }

    uploadItem(file: File) {
        const fileItem = FileItem.createFromFile(file);
        this.item = new UploadItem(fileItem);
        if (this.uploader) {
            this.item.setUploading();
            console.log(this.uploader(file));
            const dps = this.uploader(file).subscribe(res => {
                if (res === -1) {
                    dps.unsubscribe();
                    this.item.setError();
                } else {
                    typeof res === 'string' ? (this.item.setComplete(res), dps.unsubscribe()) : this.item.setProgress(res);
                }
            });
        } else {
            console.error('you need bind an uploader');
        }
    }

    getThumb(item: FileItem): string {
        const fileType = item.type;
        const types = fileType.split('/');
        let typeImage = 'assets/file-icon/';
        switch (types[0]) {
            case 'image': this.baseUrl || '' + item.src; break;
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
}