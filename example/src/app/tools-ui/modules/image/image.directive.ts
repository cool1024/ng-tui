import { Directive, HostListener, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Directive({
    selector: `img[tsImg]`,
    exportAs: 'tsImg'
})
export class ImageDirective implements OnChanges {

    @Input() dataSrc: string;

    @Input() src: string;

    @HostBinding('src') _src: string;

    @HostListener('error', ['$event.target']) onError(image: HTMLImageElement) {
        this._src = this.dataSrc || this.configService.config.errorImgSrc;
    }

    constructor(private configService: ConfigService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('src')) {
            this._src = changes.src.currentValue;
        }
    }
}
