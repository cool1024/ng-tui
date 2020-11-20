import { Directive, Input, HostBinding, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Util } from '../../tui-core/util';
import { loadImage, generateImage } from './image';

@Directive({
    selector: `img[tsImg],img[dataSrc]`,
    exportAs: 'tsImg'
})
export class ImageDirective implements OnChanges, AfterViewInit {

    @Input() src: string;
    @HostBinding('src') _src: string | SafeResourceUrl;

    private imageDom: HTMLImageElement;

    constructor(
        private domSanitizer: DomSanitizer,
        private elementRef: ElementRef
    ) { }

    ngAfterViewInit() {
        this.imageDom = this.elementRef.nativeElement;
        this.loadImage()
    }

    ngOnChanges(changes: SimpleChanges) {
        if (Util.attrNotNullAndEmpty(changes, 'src') && Util.notNull(this.imageDom)) {
            this.loadImage();
        }
    }

    private loadImage() {
        this.imageDom.src = generateImage(this.imageDom.width, this.imageDom.height);
        loadImage(this.src, this.imageDom.width, this.imageDom.height, src => {
            this._src = this.domSanitizer.bypassSecurityTrustResourceUrl(src);
        });
    }
}
