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
import { Util } from '../../tui-core/util';

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
            console.log(Object.assign({
                container: this.canvas,
                forceFit: true,
                animate: true,
            }, this.option || {}));
            this.chart = new window['G2'].Chart(Object.assign({
                container: this.canvas,
                forceFit: true,
                animate: true,
            }, this.option || {}));
            appendSimpleBarFunc(this.chart);
            appendSimpleLineFunc(this.chart);
            appendSimplePieFunc(this.chart);
            appendSimpleAreaFunc(this.chart);
            this.doInit.emit(this.chart);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
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
        const gem = chart.interval()
            .position(config.position)
            .color(...config.colors)
        configShape(gem, config.shape);
    };
}

function appendSimpleLineFunc(chart: ChartInstance) {
    chart.simpleLine = (config: LineConfig) => {
        const gem = chart.line()
            .position(config.position)
            .color(...config.colors)
        configShape(gem, config.shape);
    };
}

function appendSimpleAreaFunc(chart:ChartInstance){
    chart.simpleArea = (config: LineConfig) => {
        const gem = chart.area()
            .position(config.position)
            .color(...config.colors)
        configShape(gem, config.shape);
    };
}

function appendSimplePieFunc(chart: ChartInstance) {
    chart.simplePie = (config: PieConfig) => {
        chart.coord('theta', {
            radius: config.radius,
            innerRadius: config.innerRadius
        });
        const gem = chart.intervalStack()
            .position(config.position)
            .color(...config.colors)
            .style(config.style);
        configShape(gem, config.shape);
    };
}

function configShape(gem: Geometry, shape: string | any[]) {
    console.log(shape);
    if (Util.notNullAndEmpty(shape)) {
        if (Util.isString(shape)) {
            gem.shape(shape as string);
        } else if (Array.isArray(shape)) {
            gem.shape(shape as any);
        }
    }
}

export interface Options {
    scales?: any; // 列定义声明
    coord?: any; // 坐标系配置
    axes?: boolean | any; // 坐标轴配置
    legends?: any; // 图例配置
    guides?: any; // 图表辅助元素配置
    filters?: any; // 数据过滤配置
    tooltip?: any; // 提示信息配置
    facet?: any; // 分面配置
    geoms?: any; // 图形语法相关配置
}

export interface ChartOption {
    container?: string | HTMLDivElement;
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
    options?: Options;
}

export interface BarConfig {
    position: string | string[];
    colors: any[];
    shape?: string | any[];
    style?: any;
}

export interface AreaConfig extends BarConfig { }

export interface LineConfig extends BarConfig { }

export interface PieConfig extends BarConfig {
    radius: number;
    innerRadius: number;
}

export interface ChartInstance {
    source(data: any[] | any): ChartInstance;
    interval(): Geometry;
    line(): Geometry;
    area(): Geometry;
    simpleBar(config: BarConfig);
    simpleLine(config: LineConfig);
    simpleArea(config: AreaConfig);
    simplePie(config: PieConfig);
    render();
    coord(type: string, config: any);
    tooltip(config: any);
    intervalStack();
}

export interface Geometry {
    position(position: string | string[]): Geometry;
    color(field?: string, colors?: string | string[] | Function): Geometry;
    shape(field: string, shapes?: string | string[] | Function): Geometry;
}