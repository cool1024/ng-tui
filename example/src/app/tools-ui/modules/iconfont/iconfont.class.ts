import { TUIConfig } from '../../tui-core/interfaces/config.interface';

export class Iconfont {
    constructor(private icon: string, private flash: boolean) { }

    createDocumentNode(config: TUIConfig): HTMLElement {
        const dom: HTMLElement = document.createElement('i');
        dom.classList.add(config.iconfontPrefix, `icon-${this.icon}`);
        if (this.flash) {
            dom.classList.add(...config.iconfontLoadingClass);
        }
        return dom;
    }
}
