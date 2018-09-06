import {
    Directive,
    HostListener, EventEmitter, Input, ElementRef, Output, HostBinding, AfterViewInit, OnChanges, SimpleChanges
} from '@angular/core';
import { BaseTheme } from '../../tui-core/base-class/base-theme.class';
import { Loader } from '../../tui-core/interfaces/loader.interface';
import { Iconfont } from '../iconfont/iconfont.class';
import { ConfigService } from '../../tui-core/base-services/config.service';

@Directive({
    selector: `button[tsBtn]`,
    exportAs: 'tsBtn'
})
export class ButtonDirective extends BaseTheme implements AfterViewInit, OnChanges, Loader {

    private button: HTMLButtonElement;

    private iconDom: HTMLElement;

    private oldClass: string;

    @Input() loading: string;

    @Output() submit = new EventEmitter<Loader>(false);

    @Input() disabled: boolean;

    @HostBinding('disabled') get _disabled(): boolean {
        return this.disabled || !!this.iconDom;
    }

    @HostListener('click') onClick(): void {
        this.present();
        this.submit.emit(this);
    }

    constructor(
        private el: ElementRef,
        private configService: ConfigService
    ) {
        super();
        this.color = 'white';
    }

    ngAfterViewInit() {
        this.button = this.el.nativeElement;
        this.button.type = 'button';
        this.applyView();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color && !changes.color.isFirstChange()) {
            this.applyView();
        }
    }

    applyView() {
        if (this.button) {
            if (this.oldClass) {
                this.button.classList.remove(...this.oldClass.split(' ').filter(item => !!item));
            }
            this.oldClass = this.btnClass;
            this.button.classList.add(...this.oldClass.split(' ').filter(item => !!item));
        }
    }

    present() {
        if (this.isApply(this.loading) && !this.iconDom) {
            const iconfont = new Iconfont(this.loading || this.configService.config.buttonLoadingIcon, true);
            this.iconDom = iconfont.createDocumentNode(this.configService.config);
            this.button.insertBefore(this.iconDom, this.button.childNodes[0]);
        }
    }

    complete() {
        this.dismiss();
    }

    dismiss() {
        if (this.iconDom) {
            this.button.removeChild(this.iconDom);
            this.iconDom = null;
        }
    }
}
