import { Component, AfterViewInit } from '@angular/core';
import { ScriptService } from 'projects/ng-tui/src/public_api';
import { ServerCircle, Point, Size, ServerLink } from './server-circle'
import { Paper } from './snap.interface';

@Component({
    templateUrl: './server-map.component.html'
})
export class ServerMapComponent implements AfterViewInit {

    private servers: ServerCircle[] = [];

    private svgPaper: Paper;

    constructor(private script: ScriptService) {

    }

    ngAfterViewInit() {
        this.script.load('assets/snap.svg-min.js', window['Snap']);
        this.script.complete(() => this.initSVG())
    }

    initSVG() {
        const Snap = window['Snap'] as any;
        this.svgPaper = Snap('#svgElement') as Paper;
        this.svgPaper.attr({ width: 500, height: 500 });
        this.drawServer(150, 150, 10);
        this.drawServer(23, 98, 10);
        this.drawServerLink(this.servers[0], this.servers[1]);
    }

    drawServerLink(startServer: ServerCircle, endServer: ServerCircle) {
        const link = new ServerLink(this.svgPaper, startServer, endServer);
        link.size.w = 1;
        link.draw();
        link.showPing();
    }

    drawServer(x: number, y: number, r: number) {
        const server = new ServerCircle(this.svgPaper);
        server.point = new Point(x, y);
        server.size.r = r;
        server.draw();
        server.showPing();
        this.servers.push(server);
    }
}
