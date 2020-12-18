import { Component } from "@angular/core";
import { Api } from '../../services/api';
import { FileItem } from '../../services/file';

const PhotoSwipe = window['PhotoSwipe'];
const PhotoSwipeUI_Default = window['PhotoSwipeUI_Default'];

@Component({
    templateUrl: './dir.component.html',
    styleUrls: ['dir.component.scss']
})
export class DirComponent {

    items: FileItem[] = [];
    dirs: string[] = [];

    constructor(private api: Api) {
        this.loadDir();
    }

    loadDir(dir = '') {
        this.dirs.push(dir);
        this.api.getDirs(dir).subscribe(items => this.items = items);
    }

    backParent() {
        this.dirs.pop();
        if (this.dirs.length > 0) {
            this.loadDir(this.dirs.pop());
        }
    }

    goToDir(index: number) {
        const dir = this.dirs[index];
        this.dirs.splice(index);
        this.loadDir(dir);
    }

    showDetail(item: FileItem) {
        if (item.fileType === 'DIR') {
            this.loadDir(item.filePath);
        }
        if (item.fileType === 'IMAGE') {
            this.showGallery(item);
        }
    }

    showGallery(item: FileItem) {
        const images = this.items.filter(e => e.fileType === 'IMAGE')
            .map(e => ({ src: e.previewUrl, w: Number(e.previewSize.width), h: Number(e.previewSize.height) }));
        const index = images.findIndex(image => image.src === item.previewUrl);
        console.log(images[index], index);
        const gallery = new PhotoSwipe(document.getElementById('swiper'), PhotoSwipeUI_Default, images, { index });
        gallery.init();
    }
}