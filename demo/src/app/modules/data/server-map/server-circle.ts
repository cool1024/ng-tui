import { Circle, Paper, Element } from "./snap.interface";

export class Point {
    constructor(public x: number = 0, public y: number = 0) { }
}
export class Size {
    constructor(public w: number = 0, public h: number = 0, public r: number = 0) { }
}

export class DrawElement {
    constructor(public point: Point = new Point(), public size: Size = new Size()) { }
}

export class ServerCircle extends DrawElement {

    private circle: Circle;

    constructor(private paper: Paper) {
        super()
    }

    draw() {
        this.circle = this.paper.circle(this.point.x, this.point.y, this.size.r)
        this.circle.attr({
            fill: '#bada55',
            stroke: '#000',
            strokeWidth: this.size.r / 20.0
        });
    }

    showPing() {
        this.circle.animate({
            cx: 10,
        }, 1000, window['mina'].elastic, () => {
            this.circle.attr({ cx: this.point.x });
            this.showPing()
        })
    }
}

export class ServerLink extends DrawElement {

    private path: Element;

    constructor(private paper: Paper, private startServer: ServerCircle, private endServer: ServerCircle) { super() }

    draw() {
        this.path = this.paper.path(`M${this.startServer.point.x} ${this.startServer.point.y}L${this.endServer.point.x} ${this.endServer.point.y}`)
        this.path.attr({
            stroke: '#bada55',
            strokeWidth: this.size.w
        });

    }

    showPing() {
    }
}