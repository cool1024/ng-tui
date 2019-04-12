import { Rect } from './component.interface';
import { ValueChangeListenerService } from '../base-services/value-listener.service';
// import IntersectionObserver from 'intersection-observer-polyfill';

export class ViewTool {
    private positionUpdateFunc: Function;

    private obs: any;

    constructor(public toggleDom?: HTMLElement, public targetDom?: HTMLElement) { }

    clean() {
        // tslint:disable-next-line:no-unused-expression
        this.obs && ValueChangeListenerService.getInstance().removeObs(this.obs);
    }

    autoPosition(offsetX: number = 0, offsetY: number = 0) {
        // tslint:disable-next-line:no-unused-expression
        this.obs && ValueChangeListenerService.getInstance().removeObs(this.obs);
        this.obs = ValueChangeListenerService.getInstance().observeClientRect(this.toggleDom, () => {
            const tRect = this.getRect(this.toggleDom);
            const mRect = this.getRect(this.targetDom);
            let top = tRect.y + offsetY + tRect.h;
            let left = tRect.x + offsetX;
            // 绝对不能超过下边界
            if (window.innerHeight < top + mRect.h) {
                top = window.innerHeight - mRect.h;
            }
            // 绝对不能超过右边界
            if (window.innerWidth < left + mRect.w) {
                left = window.innerWidth - mRect.w;
            }
            this.targetDom.style.top = top + 'px';
            this.targetDom.style.left = left + 'px';
        });
    }

    autoPositionBottom(offsetX: number = 0, offsetY: number = 0) {
        // tslint:disable-next-line:no-unused-expression
        this.obs && ValueChangeListenerService.getInstance().removeObs(this.obs);
        this.obs = ValueChangeListenerService.getInstance().observeClientRect(this.toggleDom, () => {
            const tRect = this.getRect(this.toggleDom);
            this.targetDom.style.top = tRect.y + offsetY + tRect.h + 'px';
            this.targetDom.style.left = tRect.x + offsetX + 'px';
        });
    }

    autoPositionTop(offsetX: number = 0, offsetY: number = 0) {
        // tslint:disable-next-line:no-unused-expression
        this.obs && ValueChangeListenerService.getInstance().removeObs(this.obs);
        this.obs = ValueChangeListenerService.getInstance().observeClientRect(this.toggleDom, () => {
            const tRect = this.getRect(this.toggleDom);
            const mRect = this.getRect(this.targetDom);
            this.targetDom.style.top = tRect.y + offsetY - mRect.h + 'px';
            this.targetDom.style.left = tRect.x + offsetX + 'px';
        });
    }

    getRect(dom: HTMLElement): Rect {
        const rect = dom.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height
        };
    }
}
