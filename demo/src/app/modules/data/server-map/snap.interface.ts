export interface Snap { }

export interface Paper {
    circle(x: number, y: number, r: number): Circle
    path(path: string): Element
    attr(params: string | any): Element | String
}

export interface Element {
    attr(params: string | any): Element | String
    animate(attrs: any, duration: number, easing?: string, callback?: Function)
}

export interface Circle extends Element {

}