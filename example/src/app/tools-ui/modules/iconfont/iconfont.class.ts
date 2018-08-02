import { TUIConfig } from '../../tui-core/interfaces/config.interface';

export class Iconfont {
    constructor(private icon: string, private flash: boolean) { }

    createDocumentNode(config: TUIConfig): HTMLElement {
        let dom: HTMLElement;
        let prefix = config.iconfontPrefix;
        const iconType = config.iconfontType;
        if (iconType === 'symbol') {
            const div = document.createElement('div');
            prefix = config.iconfontSymbolPrefix;
            div.innerHTML = `<svg class="${prefix}"><use xlink:href="#icon-${this.icon}"></use></svg>`;
            dom = <HTMLElement>div.firstChild;
        } else if (iconType === 'unicode') {
            dom = document.createElement('i');
            dom.classList.add(prefix);
            dom.innerHTML = this.icon;
        } else {
            dom = document.createElement('i');
            dom.classList.add(prefix, `icon-${this.icon}`);
        }
        if (this.flash) {
            dom.classList.add(...config.iconfontLoadingClass);
        }
        return dom;
    }
}
