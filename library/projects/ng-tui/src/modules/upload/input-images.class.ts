import { SafeResourceUrl } from '@angular/platform-browser';

export interface UploadItem {
    type: string;
    file: File;
    url: string | SafeResourceUrl;
    uploading: boolean;
    progress?: number;
    error?: boolean;
}

export class InputImages {

    public items: Array<UploadItem>;

    constructor(images: string = '') {
        this.items = new Array<UploadItem>();
        if (!!images) {
            images.split(',').forEach(url => {
                this.items.push({ type: 'url', file: null, url, uploading: false });
            });
        }
    }

    get urls(): string[] {
        const urls = new Array<string>();
        this.items.forEach(e => {
            if (e.type === 'url') {
                urls.push(<string>e.url);
            }
        });
        return urls;
    }

    get files(): File[] {
        const files = new Array<File>();
        this.items.forEach(e => {
            if (e.type === 'file') {
                files.push(e.file);
            }
        });
        return files;
    }

    get fileItems(): Array<UploadItem> {
        const fileItems = new Array<UploadItem>();
        this.items.forEach(e => {
            if (e.type === 'file') {
                fileItems.push(e);
            }
        });
        return fileItems;
    }

    updateProgress(index: number, progress: number) {
        this.items[index].progress = progress;
    }

    updateItem(index: number, params: any) {
        this.items[index] = Object.assign(this.items[index], params);
    }

    push(item: UploadItem) {
        return this.items.push(item) - 1;
    }

    remove(index: number) {
        this.items.splice(index, 1);
    }
}
