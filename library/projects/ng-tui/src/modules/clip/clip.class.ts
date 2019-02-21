import { Observable, fromEvent, fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';

declare const Snap: any;

export class ClipPad {

    pad: HTMLDivElement;
    img: HTMLImageElement;
    svg: any;
    padSize: any;
    expWidth: number;
    expHeight: number;
    rect: any;
    circles: Array<any>;

    svgSize(file: File) {
        this.svg = Snap(0, 0);
        this.imgSize(file).subscribe(size => {
            const imgK = size.height / size.width;
            this.expHeight = this.padSize.height;
            this.expWidth = this.expHeight / imgK;
            if (size.height > this.padSize.height) {
                this.expHeight = this.padSize.height;
                this.expWidth = this.expHeight / imgK;
            }
            if (this.expWidth > this.padSize.width) {
                this.expWidth = this.padSize.width;
                this.expHeight = this.expWidth * imgK;
            }
            const dw = (this.padSize.width - this.expWidth) / 2;
            const dh = (this.padSize.height - this.expHeight) / 2;
            this.svg.attr({
                width: this.expWidth,
                height: this.expHeight,
                style: `margin-top:${dh}px;margin-left:${dw}px;position:absolute;`,
            });
            this.img.width = this.expWidth;
            this.img.height = this.expHeight;
            this.img.style.marginTop = `${dh}px`;
            this.img.style.marginLeft = `${dw}px`;
            this.img.style.position = 'absolute';
            this.pad.appendChild(this.img);
            this.pad.appendChild(this.svg.node);
            this.appedRect();
            this.appendCircle(this.rect);
        });
    }

    imgAutoSize(file: File | string): Observable<{ x: number, y: number, w: number, h: number }> {
        return this.imgSize(file).pipe(map(size => {
            const imgK = size.height / size.width;
            this.expHeight = this.padSize.height;
            this.expWidth = this.expHeight / imgK;
            if (size.height > this.padSize.height) {
                this.expHeight = this.padSize.height;
                this.expWidth = this.expHeight / imgK;
            }
            if (this.expWidth > this.padSize.width) {
                this.expWidth = this.padSize.width;
                this.expHeight = this.expWidth * imgK;
            }
            const dw = (this.padSize.width - this.expWidth) / 2;
            const dh = (this.padSize.height - this.expHeight) / 2;
            console.log(size);
            return { x: dw, y: dh, w: this.expWidth, h: this.expHeight };
        }));
    }

    imgSize(file: File | string): Observable<any> {
        this.img = new Image();
        this.img.src = typeof file === 'string' ? file : window.URL.createObjectURL(file);
        return fromEvent<Event>(this.img, 'load').pipe(map<Event, any>(() => {
            return { width: this.img.width, height: this.img.height };
        }));
    }

    appedRect() {
        const rect = this.svg.paper
            .rect(this.expWidth * .1, this.expHeight * .1, this.expWidth * .8, this.expHeight * .8)
            .attr({
                fill: 'transparent',
                stroke: 'white',
                strokeWidth: 2,
                strokeDasharray: '5,5',
            });
        let cx = '0', cy = '0';
        rect.drag(
            (dx, dy) => {
                const epx = parseInt(cx, 10) + dx;
                const epy = parseInt(cy, 10) + dy;
                this.moveRect({ x: epx, y: epy }, { x: this.expWidth, y: this.expHeight }, rect);
                this.moveCircle();
            },
            () => {
                cx = rect.attr('x');
                cy = rect.attr('y');
            }
        );
        this.rect = rect;
    }

    appendCircle(rect: any) {
        let w = parseInt(rect.attr('width'), 10);
        let h = parseInt(rect.attr('height'), 10);
        let x = parseInt(rect.attr('x'), 10);
        let y = parseInt(rect.attr('y'), 10);
        const r = 20;
        const circles = new Array<any>();
        circles.push(this.svg.paper.circle(x + w / 2, y, r)
            .attr({ fill: 'white', stroke: 'rgb(100,100,100)', strokeWidth: 2, style: 'cursor:pointer;' }));
        circles.push(this.svg.paper.circle(x + w / 2, y + h, r)
            .attr({ fill: 'white', stroke: 'rgb(100,100,100)', strokeWidth: 2, style: 'cursor:pointer;' }));
        circles.push(this.svg.paper.circle(x, y + h / 2, r)
            .attr({ fill: 'white', stroke: 'rgb(100,100,100)', strokeWidth: 2, style: 'cursor:pointer;' }));
        circles.push(this.svg.paper.circle(x + w, y + h / 2, r)
            .attr({ fill: 'white', stroke: 'rgb(100,100,100)', strokeWidth: 2, style: 'cursor:pointer;' }));
        this.circles = circles;
        // top法
        circles[0].drag(
            (_, dy) => {
                const epy = parseInt(circles[0].attr('by'), 10) + dy;
                let exph = h - dy;
                let expy = y + dy;
                exph = exph < r ? r : (epy > 0 ? exph : h + y);
                expy = expy < 0 ? 0 : expy;
                expy = expy > this.expHeight ? this.expHeight : expy;
                rect.attr({ height: exph, y: expy });
                this.moveCircle();
            },
            () => {
                circles[0].attr({ 'bx': parseInt(circles[0].attr('cx'), 10) });
                circles[0].attr({ 'by': parseInt(circles[0].attr('cy'), 10) });
                h = parseInt(rect.attr('height'), 10);
                y = parseInt(rect.attr('y'), 10);
            }
        );
        // bottom
        circles[1].drag(
            (_, dy) => {
                const epy = parseInt(circles[1].attr('by'), 10) + dy;
                let exph = h + dy;
                let expy = y + dy;
                exph = exph < r ? r : (epy < this.expHeight ? exph : this.expHeight - y);
                expy = expy < 0 ? 0 : expy;
                expy = expy > this.expHeight ? this.expHeight : expy;
                rect.attr({ height: exph });
                this.moveCircle();

            },
            () => {
                circles[1].attr({ 'bx': parseInt(circles[1].attr('cx'), 10) });
                circles[1].attr({ 'by': parseInt(circles[1].attr('cy'), 10) });
                h = parseInt(rect.attr('height'), 10);
                y = parseInt(rect.attr('y'), 10);
            },
        );

        // left
        circles[2].drag(
            (dx, _) => {
                const epx = parseInt(circles[2].attr('bx'), 10) + dx;
                let expw = w - dx;
                let expx = x + dx;
                expw = expw < r ? r : (epx > 0 ? expw : w + x);
                expx = expx < 0 ? 0 : expx;
                expx = expx > this.expWidth ? this.expWidth : expx;
                rect.attr({ width: expw, x: expx });
                this.moveCircle();

            },
            () => {
                circles[2].attr({ 'bx': parseInt(circles[2].attr('cx'), 10) });
                circles[2].attr({ 'by': parseInt(circles[2].attr('cy'), 10) });
                w = parseInt(rect.attr('width'), 10);
                x = parseInt(rect.attr('x'), 10);
            },
        );
        // right
        circles[3].drag(
            (dx, _) => {
                const epx = parseInt(circles[3].attr('bx'), 10) + dx;
                let expw = w + dx;
                let expx = x + dx;
                expw = expw < r ? r : (epx < this.expWidth ? expw : this.expWidth - x);
                expx = expx < 0 ? 0 : expx;
                expx = expx > this.expWidth ? this.expWidth : expx;
                rect.attr({ width: expw });
                this.moveCircle();

            },
            () => {
                circles[3].attr({ 'bx': parseInt(circles[3].attr('cx'), 10) });
                circles[3].attr({ 'by': parseInt(circles[3].attr('cy'), 10) });
                w = parseInt(rect.attr('width'), 10);
                x = parseInt(rect.attr('x'), 10);
            }
        );
    }

    moveRect(ep: any, mp: any, rect: any) {
        const w = parseInt(rect.attr('width'), 10);
        const h = parseInt(rect.attr('height'), 10);
        mp.x = mp.x - w;
        mp.y = mp.y - h;
        ep.x = mp.x > ep.x ? ep.x : mp.x;
        ep.y = mp.y > ep.y ? ep.y : mp.y;
        ep.x = ep.x > 0 ? ep.x : 0;
        ep.y = ep.y > 0 ? ep.y : 0;
        rect.attr(ep);
    }

    moveCircle() {
        const w = parseInt(this.rect.attr('width'), 10);
        const h = parseInt(this.rect.attr('height'), 10);
        const x = parseInt(this.rect.attr('x'), 10);
        const y = parseInt(this.rect.attr('y'), 10);
        this.circles[0].attr({ cx: x + w / 2, cy: y });
        this.circles[1].attr({ cx: x + w / 2, cy: y + h });
        this.circles[2].attr({ cx: x, cy: y + h / 2 });
        this.circles[3].attr({ cx: x + w, cy: y + h / 2 });
    }

    getClipImg(): Observable<File> {
        const realPoint = { x: 0, y: 0 };
        const clipRect = { w: 0, h: 0 };
        if (this.rect) {
            const k = this.img.naturalWidth / this.expWidth;
            clipRect.w = parseInt(this.rect.attr('width'), 10) * k;
            clipRect.h = parseInt(this.rect.attr('height'), 10) * k;
            realPoint.x = parseInt(this.rect.attr('x'), 10) * k;
            realPoint.y = parseInt(this.rect.attr('y'), 10) * k;
            const canvas = document.createElement('canvas');
            canvas.width = clipRect.w;
            canvas.height = clipRect.h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.img, -realPoint.x, -realPoint.y, this.img.naturalWidth, this.img.naturalHeight);
            return fromEventPattern<File>(handle => {
                canvas.toBlob(blob => {
                    handle(new File([blob], 'clip.png'));
                }, 'image/png');
            });
        }
        return null;
    }
}
