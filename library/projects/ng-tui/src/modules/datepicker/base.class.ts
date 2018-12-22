import { OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { HtmlDomService } from '../../tui-core/base-services/htmldom.service';
import { Toggle } from '../../tui-core/interfaces/toggle.interface';
import { ToggleDirective } from '../../tui-core/directives/toggle.directives';
import { TUIConfig } from '../../tui-core/interfaces/config.interface';

export const styleStr = `
.ts-datepicker-ym {width: 280px;}
.ts-datepicker-ym-toolbar {height: 30px;}
.ts-datepicker-ym tr {line-height: 25px;}
.ts-datepicker-ym td {width: 33%;}
.ts-datepicker-ym td:hover button {color: white;background-color: #3e9cff;border-color: #3e9cff;}
.ts-datepicker-hm {width: 280px;}
.ts-datepicker-hm-box {width: 33.33%; line-height: 25px;}
.ts-time-item {line-height: 30px;}
.ts-time-item.active {font-size: 20px;}`;

export class Base implements OnDestroy, Toggle {

    @ViewChild('pad') pad: ElementRef;

    @Input() color: string;

    show: boolean;

    toggleDom: HTMLElement;

    ticking = false;

    datepickerStyle = { top: '0', left: '0', display: 'none', position: 'absolute' };

    private value: string;

    autoHandle: () => void;

    applyChange = (value: any) => { };

    constructor(private html: HtmlDomService, config: TUIConfig) {
        this.show = false;
        this.color = config.defaultColor;
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.autoHandle);
        window.removeEventListener('resize', this.autoHandle);
    }

    registerOnChange(fn: any): void { this.applyChange = fn; }

    registerOnTouched(fn: any): void { }

    toggle() {
        this.show = !this.show;
        if (this.show) {
            this.autoPosition();
        }
    }

    bind(toggleDirective: ToggleDirective) {
        this.toggleDom = toggleDirective.dom;
        this.autoHandle = () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    if (this.show) {
                        this.autoPosition();
                    }
                    this.ticking = false;
                });
            }
            this.ticking = true;
        };
        window.addEventListener('scroll', this.autoHandle, false);
        window.addEventListener('resize', this.autoHandle, false);
    }

    autoPosition() {
        setTimeout(() => {
            const padPositon = this.html.getPosition(this.pad.nativeElement);
            const position = this.html.getPosition(this.toggleDom);
            const height = this.html.getHeight(this.toggleDom);
            this.datepickerStyle.display = 'none';
            this.datepickerStyle.left = position.x - padPositon.x + 'px';
            this.datepickerStyle.top = height + position.y + 7.5 + 'px';
            let top = height + position.y + 7.5 + 300;
            let right = position.x - padPositon.x + 7.5 + 280;
            if (window.innerHeight < top) {
                top = window.innerHeight - 300 - 7.5;
            } else {
                top = position.y + height + 7.5;
            }
            if (window.innerWidth < right) {
                // 修正右侧超出
                right = window.innerWidth - 280 - 7.3;
                this.datepickerStyle.left = right - padPositon.x + 'px';
            }
            this.datepickerStyle.top = top - padPositon.y + 'px';
            this.datepickerStyle.display = '';
        });
    }

    tryClose($event: any) {
        if ($event.target === this.pad.nativeElement) {
            this.toggle();
        }
    }
}
