import {
    Directive,
    AfterViewInit,
    ElementRef,
    Inject,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ScriptService } from '../../tui-core/base-services/script.service';

@Directive({
    selector: '*[tsChart]'
})
export class ChartDirective implements AfterViewInit, OnChanges {

    @Input() option: ChartOption;
    @Input() data: any;

    @Output() doInit = new EventEmitter<ChartInstance | any>(false);

    private canvas: HTMLCanvasElement;
    private chart: ChartInstance | any;

    constructor(
        private elementRef: ElementRef,
        private scriptService: ScriptService,
        @Inject('TUI_CHART_CONFIG') private config: string[]
    ) {
        this.prepareScripts();
    }

    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        this.scriptService.complete(() => {
            this.chart = new window['G2'].Chart(Object.assign({
                container: this.canvas,
                forceFit: true,
                animate: true,
            }, this.option || {}));
            appendSimpleBarFunc(this.chart);
            appendSimpleLineFunc(this.chart);
            this.doInit.emit(this.chart);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes.data && changes.data.currentValue) {
            console.log(111111);
            this.updateData();
        }
    }

    private updateData() {
        if (this.chart) {
            this.chart.source(this.data);
            this.chart.render()
        }
    }

    private prepareScripts() {
        this.scriptService.loads(this.config, !!window['G2']);
    }

}

function appendSimpleBarFunc(chart: ChartInstance) {
    chart.simpleBar = (config: BarConfig) => {
        chart.interval()
            .position(config.position)
            .color(...config.colors);
    };
}

function appendSimpleLineFunc(chart: ChartInstance) {
    chart.simpleLine = (config: LineConfig) => {
        chart.line()
            .position(config.position)
            .color(...config.colors);
    };
}

export interface ChartOption {
    container: string | HTMLDivElement;
    width?: number;
    height?: number;
    padding?: any | number | any[];
    background?: any;
    plotBackground?: any;
    forceFit?: boolean;
    animate?: boolean;
    pixelRatio?: number;
    data?: any[] | any;
    theme?: string | any;
    renderer?: string;
}

export interface BarConfig {
    position: string | string[];
    colors: any[];
}

export interface LineConfig extends BarConfig {

}

export interface ChartInstance {
    source(data: any[] | any): ChartInstance;
    interval(): Geometry;
    line(): Geometry;
    simpleBar(config: BarConfig);
    simpleLine(config: LineConfig);
    render();
}

export interface Geometry {
    position(position: string | string[]): Geometry;
    color(field?: string, colors?: string | string[] | Function): Geometry;
}