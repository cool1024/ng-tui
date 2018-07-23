import { Directive, HostListener, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { ImageConfig } from './image.config';

@Directive({
    selector: `img[tsImg]`,
    exportAs: 'tsImg'
})
export class ImageDirective implements OnChanges {

    @Input() dataSrc: string;

    @Input() src: string;

    @HostBinding('src') _src: string;

    @HostListener('error', ['$event.target']) onError(image: HTMLImageElement) {
        this._src = this.dataSrc || this.config.default;
    }

    constructor(private config: ImageConfig) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('src')) {
            this._src = changes.src.currentValue;
        }
    }
}
