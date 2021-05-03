import {
    Directive,
    HostListener,
    EventEmitter,
    Input,
    ElementRef,
    Output,
    HostBinding,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { ThemeDirective } from '../../tui-core/directive/theme.directive';
import { Loader } from '../../tui-core/interface/loader.interface';
import { Iconfont } from '../iconfont/iconfont.class';
import { ConfigService } from '../../tui-core/service/config.service';

@Directive({
    selector: `button[tsBtn]`,
    exportAs: 'tsBtn',
})
export class ButtonDirective extends ThemeDirective implements AfterViewInit, OnChanges, Loader {
    private button!: HTMLButtonElement;

    private iconDom?: HTMLElement;

    private oldClass?: string;

    @Input() set tsBtn(color: string | any) {
        color && (this.color = color);
    }

    @Input() loading!: string;

    // tslint:disable-next-line: no-output-native
    @Output() submit = new EventEmitter<Loader>(false);

    @Input() disabled!: boolean;

    @HostBinding('disabled') get _disabled(): boolean {
        return this.disabled || !!this.iconDom;
    }

    @HostListener('click') onClick(): void {
        this.present();
        this.submit.emit(this);
    }

    constructor(private el: ElementRef, private configService: ConfigService) {
        super();
        this.color = 'white';
    }

    ngAfterViewInit(): void {
        this.button = this.el.nativeElement;
        this.button.type = 'button';
        this.applyView();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.color && !changes.color.isFirstChange()) {
            this.applyView();
        }
    }

    applyView(): void {
        if (this.button) {
            if (this.oldClass) {
                this.button.classList.remove(...this.oldClass.split(' ').filter((item) => !!item));
            }
            this.oldClass = this.btnClass;
            this.button.classList.add(...this.oldClass.split(' ').filter((item) => !!item));
        }
    }

    present(): void {
        if (this.isApply(this.loading) && !this.iconDom) {
            const iconfont = new Iconfont(this.loading || this.configService.config.buttonLoadingIcon, true);
            this.iconDom = iconfont.createDocumentNode(this.configService.config);
            this.button.insertBefore(this.iconDom, this.button.childNodes[0]);
        }
    }

    complete(): void {
        this.dismiss();
    }

    dismiss(): void {
        if (this.iconDom) {
            this.button.removeChild(this.iconDom);
            this.iconDom = undefined;
        }
    }
}
