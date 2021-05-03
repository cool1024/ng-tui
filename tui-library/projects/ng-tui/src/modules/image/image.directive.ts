import { Directive, Input, HostBinding, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Util } from '../../tui-core/util';
import { loadImage, generateImage } from './image';

@Directive({
    selector: `img[tsImg],img[dataSrc]`,
    exportAs: 'tsImg',
})
export class ImageDirective implements OnChanges, AfterViewInit {
    @Input() src!: string;
    @HostBinding('src') mSrc!: string | SafeResourceUrl;

    private imageDom!: HTMLImageElement;

    constructor(private domSanitizer: DomSanitizer, private elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        this.imageDom = this.elementRef.nativeElement;
        this.loadImage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (Util.attrNotNullAndEmpty(changes, 'src') && Util.notNull(this.imageDom)) {
            this.loadImage();
        }
    }

    private loadImage(): void {
        this.imageDom.src = generateImage(this.imageDom.width, this.imageDom.height);
        loadImage(this.src, this.imageDom.width, this.imageDom.height, (src) => {
            this.mSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(src);
        });
    }
}
