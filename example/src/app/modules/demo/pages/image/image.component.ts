import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WindowService, ClipComponent, DrawComponent } from 'ng-tui';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent {

    clipImg: SafeResourceUrl;
    drawImg: SafeResourceUrl;

    constructor(
        private window: WindowService,
        private domSanitizer: DomSanitizer,
    ) { }

    /**
     * 图片裁剪示例
     * @param files 选择的文件列表
     */
    showClipWindow(files: File[]) {
        if (files.length > 0) {
            const win = this.window.push(ClipComponent);
            win.instance.file = files[0];
            win.present().subscribe(file => {
                if (file) {
                    this.clipImg = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
                }
            });
        }
    }

    /**
     * 图片涂鸦示例
     * @param files 选择的文件列表
     */
    showDrawWindow(files: File[]) {
        if (files.length > 0) {
            const win = this.window.push(DrawComponent);
            win.instance.file = files[0];
            win.present().subscribe(file => {
                if (file) {
                    this.drawImg = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
                }
            });
        }
    }

}
