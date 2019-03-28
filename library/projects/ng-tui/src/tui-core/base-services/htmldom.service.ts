import { Injectable } from '@angular/core';

@Injectable()
export class HtmlDomService {

    private intervalHandlers = new Array<any>();
    private interval: any;

    getExpHeight(dom: HTMLElement): number {
        dom.style.visibility = 'hidden';
        const height = dom.clientHeight;
        dom.style.visibility = '';
        return height;
    }

    getPosition(dom: HTMLElement): { x: number, y: number } {
        const rect = dom.getBoundingClientRect();
        return { x: rect.left, y: rect.top };
    }

    getHeight(dom: HTMLElement): number {
        return dom.clientHeight;
    }

    getWidth(dom: HTMLElement): number {
        return dom.clientWidth;
    }

    addInterval(handler: any) {
        // tslint:disable-next-line:no-unused-expression
        this.interval || (this.interval = setInterval(() => this.handlerFunc(), 100));
        this.intervalHandlers.push(handler);
    }

    removeInterval(handler: any) {
        const i = this.intervalHandlers.indexOf(handler);
        // tslint:disable-next-line:no-unused-expression
        i > -1 && this.intervalHandlers.splice(i, 1);
    }

    handlerFunc() {
        this.intervalHandlers.forEach(func => {
            try {
                func();
            } catch (e) {
                console.log('interval run error');
                console.error(e);
            }
        });
    }
}
