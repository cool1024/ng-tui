import { SafeResourceUrl } from '@angular/platform-browser';

export class FileItem {

    static createFromFile(file: File) {
        return new FileItem(file.type, file.name, file)
    }

    constructor(public type: string, public name: string, public file?: File, public src?: string | SafeResourceUrl) { }
}

export class UploadItem {

    uploading = false;
    progress = 0;
    error = false;

    constructor(public fileItem: FileItem) { }

    setUploading() {
        this.uploading = true;
        this.progress = 0;
        this.error = false;
    }

    setError() {
        this.error = true;
        this.uploading = false;
    }

    setProgress(progress: number) {
        this.error = false;
        this.progress = progress;
    }

    setComplete(src: string) {
        this.fileItem.src = src;
        this.uploading = false;
        this.progress = 100;
        this.error = false;
    }
}