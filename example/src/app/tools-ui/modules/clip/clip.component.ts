/**
 * 图片裁剪面板
 *
 * @author xiaojian
 * @file   clip.component.ts
 * @date   2018-7-7 17:52:13
 */
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { WindowViewService } from '../window/window-view.service';
import { ClipPad } from './clip.class';

@Component({
    templateUrl: './clip.component.html',
})
export class ClipComponent implements AfterViewInit {

    @ViewChild('clipPad') divElement: ElementRef;

    file: File;

    clipPad = new ClipPad();

    constructor(public view: WindowViewService) { }

    ngAfterViewInit() {
        this.clipPad.padSize = { width: 600, height: 400 };
        this.clipPad.pad = this.divElement.nativeElement;
        this.clipPad.svgSize(this.file);
    }

    confirmClip() {
        const handle = this.clipPad.getClipImg();
        if (handle) {
            handle.subscribe(file => {
                this.view.close(file);
            });
        }
    }

    confirmSource() {
        this.view.close(this.file);
    }
}
