import { SafeResourceUrl } from '@angular/platform-browser';

export class InputImages {

    public items: Array<{ type: string, file: File, url: string | SafeResourceUrl, uploading: boolean }>;

    constructor(images: string = '') {
        this.items = new Array<{ type: string, file: File, url: string | SafeResourceUrl, uploading: boolean }>();
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

    get fileItems(): Array<{ type: string, file: File, url: string | SafeResourceUrl, uploading: boolean }> {
        const fileItems = new Array<{ type: string, file: File, url: string | SafeResourceUrl, uploading: boolean }>();
        this.items.forEach(e => {
            if (e.type === 'file') {
                fileItems.push(e);
            }
        });
        return fileItems;
    }

    push(item: { type: string, file: File, url: string | SafeResourceUrl, uploading: boolean }) {
        this.items.push(item);
    }

    remove(index: number) {
        this.items.splice(index, 1);
    }
}
