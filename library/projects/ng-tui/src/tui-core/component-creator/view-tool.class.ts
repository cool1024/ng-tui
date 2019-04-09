import { Rect } from './component.interface';
import IntersectionObserver from 'intersection-observer-polyfill';

export class ViewTool {

    private positionObserver: IntersectionObserver;
    private positionUpdateFunc: Function;

    constructor(public toggleDom?: HTMLElement, public targetDom?: HTMLElement) {
        this.positionObserver = new IntersectionObserver(() => {
            // tslint:disable-next-line:no-unused-expression
            this.positionUpdateFunc && this.positionUpdateFunc();
        }, { threshold: [0, 0.1, 0.2, 0.5, 1] });
    }

    autoPosition(offsetX: number = 0, offsetY: number = 0) {
        this.positionUpdateFunc = () => {
            const tRect = this.getRect(this.toggleDom);
            this.targetDom.style.top = tRect.y + offsetY + 'px';
            this.targetDom.style.left = tRect.x + offsetX + 'px';
        };
        this.positionObserver.observe(this.toggleDom);
    }

    autoPositionBottom(offsetX: number = 0, offsetY: number = 0) {
        this.positionUpdateFunc = () => {
            const tRect = this.getRect(this.toggleDom);
            this.targetDom.style.top = tRect.y + offsetY + tRect.h + 'px';
            this.targetDom.style.left = tRect.x + offsetX + 'px';
        };
        this.positionObserver.observe(this.toggleDom);
    }

    autoPositionTop(offsetX: number = 0, offsetY: number = 0) {
        this.positionUpdateFunc = () => {
            const tRect = this.getRect(this.toggleDom);
            const mRect = this.getRect(this.targetDom);
            this.targetDom.style.top = tRect.y + offsetY - mRect.h + 'px';
            this.targetDom.style.left = tRect.x + offsetX + 'px';
        };
        this.positionObserver.observe(this.toggleDom);
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
