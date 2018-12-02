import { Injectable } from '@angular/core';

@Injectable()
export class HtmlDomService {

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
}
