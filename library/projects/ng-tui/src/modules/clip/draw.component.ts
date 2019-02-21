/**
 * 图片绘画面板
 *
 * @author xiaojian
 * @file   draw.component.ts
 * @date   2018-7-7 17:52:13
 */
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { WindowViewService } from '../window/window-view.service';
import { ClipPad } from './clip.class';

@Component({
    templateUrl: './draw.component.html',
    styles: [
        `.paint-dot{width:30px;height:30px;border-radius:50%;margin-right:10px;font-size:20px;}`
    ]
})
export class DrawComponent implements AfterViewInit {

    @ViewChild('drawPad') divElement: ElementRef;

    clipPad = new ClipPad();
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    canDraw: boolean;
    drawStartPoint: { x: number, y: number };
    cacheArray = new Array<string>();
    activeColor = 'red';

    file: File | string;

    constructor(public view: WindowViewService) { }

    ngAfterViewInit() {
        const div: HTMLDivElement = this.divElement.nativeElement;
        this.clipPad.padSize = { width: 600, height: 400 };
        this.clipPad.imgAutoSize(this.file).subscribe(rect => {
            this.canvas = document.createElement('canvas');
            div.appendChild(this.canvas);
            this.canvas.style.marginTop = rect.y + 'px';
            this.canvas.style.marginLeft = rect.x + 'px';
            this.canvas.width = rect.w;
            this.canvas.height = rect.h;
            this.clipPad.img.width = 400;
            this.clipPad.img.height = 400;
            this.context = this.canvas.getContext('2d');
            this.context.drawImage(this.clipPad.img, 0, 0, rect.w, rect.h);
            this.initDrawEvent();
        });
    }

    initDrawEvent() {
        this.canvas.addEventListener('mousedown', (event) => {
            this.canDraw = true;
            this.drawStartPoint = { x: event.offsetX, y: event.offsetY };
            this.cacheArray.push(this.canvas.toDataURL());
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.drawLine({ x: event.offsetX, y: event.offsetY });
        });
        this.canvas.addEventListener('mouseup', (event) => {
            this.drawStartPoint = { x: event.offsetX, y: event.offsetY };
            this.canDraw = false;
        });
        this.canvas.addEventListener('mouseleave', (event) => {
            this.canDraw = false;
        });
    }

    drawLine(endPoint: { x: number, y: number }) {
        if (this.canDraw) {
            this.context.beginPath();
            this.context.lineJoin = 'round';
            this.context.strokeStyle = this.activeColor;
            this.context.moveTo(this.drawStartPoint.x, this.drawStartPoint.y);
            this.context.lineTo(endPoint.x, endPoint.y);
            this.context.closePath();
            this.context.stroke();
            this.drawStartPoint = endPoint;
        }
    }

    reDo() {
        if (this.cacheArray.length > 0) {
            this.context.clearRect(0, 0, this.clipPad.padSize.width, this.clipPad.padSize.height);
            const image = new Image();
            image.src = this.cacheArray.pop();
            image.onload = () => this.context.drawImage(image, 0, 0);
        }
    }

    confirmDraw() {
        this.canvas.toBlob(blob => {
            this.view.close(new File([blob], 'draw.png'));
        }, 'image/png');
    }
}
