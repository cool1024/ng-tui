import { Component } from "@angular/core";
import { Api } from '../../services/api';
import { FileItem } from '../../services/file';

@Component({
    templateUrl: './dir.component.html',
    styleUrls: ['dir.component.scss']
})
export class DirComponent {

    items: FileItem[] = [];

    constructor(private api: Api) {
        this.loadDir();
    }

    loadDir(dir = '') {
        this.api.getDirs(dir).subscribe(items => this.items = items);
    }

    showDetail(item: FileItem) {
        if (item.fileType === 'DIR') {
            this.loadDir(item.filePath);
        }
    }

}