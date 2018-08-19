import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Directive({
    selector: '*[tsIcon]'
})
export class IconfontDirective implements OnInit {

    @Input() set tsIcon(icon: string) {
        if (this.icon === icon) {
            return;
        }
        this.applyIcon(icon);
        this.icon = icon;
    }

    @Input() set loading(status: any) {
        const dom: HTMLElement = this.elementRef.nativeElement;
        const loadingClass = this.configService.config.iconfontLoadingClass;
        (!!status || status === '') ? dom.classList.add(...loadingClass) : dom.classList.remove(...loadingClass);
    }

    private icon: string;

    constructor(
        private elementRef: ElementRef,
        private configService: ConfigService
    ) { }

    ngOnInit() {
        this.applyIcon(this.icon);
    }

    private applyIcon(icon: string) {

        if (!this.elementRef) {
            return;
        }
        const dom: HTMLElement = this.elementRef.nativeElement;
        dom.classList.remove(`icon-${this.icon}`);
        dom.classList.add(this.configService.config.iconfontPrefix, `icon-${icon}`);
    }
}
