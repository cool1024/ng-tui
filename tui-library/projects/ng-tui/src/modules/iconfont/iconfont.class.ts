import { TUICoreConfig } from '../../tui-core/interface/config.interface';

export class Iconfont {
    constructor(private icon: string, private flash: boolean) {}

    createDocumentNode(config: TUICoreConfig): HTMLElement {
        const dom: HTMLElement = document.createElement('i');
        dom.classList.add(config.iconfontPrefix, `icon-${this.icon}`, 'mr-1');
        if (this.flash) {
            dom.classList.add(...config.iconfontLoadingClass);
        }
        return dom;
    }
}
