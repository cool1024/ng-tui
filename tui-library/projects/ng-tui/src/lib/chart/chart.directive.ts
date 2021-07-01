import {
    Directive,
    AfterViewInit,
    ElementRef,
    Inject,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { ScriptService } from '../../tui-core/service/script.service';
import { Util } from '../../tui-core/util';

@Directive({
    selector: '*[tsChart]',
})
export class ChartDirective implements AfterViewInit, OnChanges {
    @Input() option?: ChartOption;
    @Input() data: any;

    @Output() doInit = new EventEmitter<ChartInstance | any>(false);

    private canvas?: HTMLCanvasElement;
    private chart: ChartInstance | any;

    constructor(
        private elementRef: ElementRef,
        private scriptService: ScriptService,
        @Inject('TUI_CHART_CONFIG') private config: string[]
    ) {
        this.prepareScripts();
    }

    private G2(): any {
        return (window as any).G2;
    }

    ngAfterViewInit(): void {
        this.canvas = this.elementRef.nativeElement;
        this.scriptService.complete(() => {
            this.chart = new (this.G2().Chart)(
                Object.assign(
                    {
                        container: this.canvas,
                        forceFit: true,
                        animate: true,
                    },
                    this.option || {}
                )
            );
            appendSimpleBarFunc(this.chart);
            appendSimpleLineFunc(this.chart);
            appendSimplePieFunc(this.chart);
            appendSimpleAreaFunc(this.chart);
            this.doInit.emit(this.chart);
            this.updateData();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (Util.notNull(changes.data) && Util.notNullAndEmpty(changes.data.currentValue)) {
            this.updateData();
        }
    }

    private updateData(): void {
        if (this.chart && Util.notNullAndEmpty(this.data)) {
            this.chart.source(this.data);
            this.chart.render();
        }
    }

    private prepareScripts(): void {
        this.scriptService.loads(this.config, this.G2());
    }
}

function appendSimpleBarFunc(chart: ChartInstance): void {
    chart.simpleBar = (config: BarConfig) => {
        const gem = chart
            .interval()
            .position(config.position)
            .color(...config.colors);
        configShape(gem, config.shape);
    };
}

function appendSimpleLineFunc(chart: ChartInstance): void {
    chart.simpleLine = (config: LineConfig) => {
        const gem = chart
            .line()
            .position(config.position)
            .color(...config.colors);
        configShape(gem, config.shape);
    };
}

function appendSimpleAreaFunc(chart: ChartInstance): void {
    chart.simpleArea = (config: LineConfig) => {
        const gem = chart
            .area()
            .position(config.position)
            .color(...config.colors);
        configShape(gem, config.shape);
    };
}

function appendSimplePieFunc(chart: ChartInstance): void {
    chart.simplePie = (config: PieConfig) => {
        chart.coord(config.coordName || 'theta', {
            radius: config.radius,
            innerRadius: config.innerRadius,
        });
        const gem = chart
            .intervalStack()
            .position(config.position)
            .color(...config.colors)
            .style(config.style);
        configShape(gem, config.shape);
    };
}

function configShape(gem: Geometry, shape?: string | any[]): void {
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
    geoms?: GeomOption[]; // 图形语法相关配置
}

export interface ChartOption {
    container?: string | HTMLDivElement;
    tooltip?: boolean | any;
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

export interface GeomOption {
    type?: string; // 声明 geom 的类型：
    // point line path area interval polygon schema edge heatmap
    // pointStack pointJitter pointDodge intervalStack intervalDodge intervalSymmetric areaStack schemaDodge
    adjust?: string | any[]; // 数据调整方式声明，如果只有一种调整方式，可以直接声明字符串，如果有多种混合方式，则以数组格式传入
    position?: string | any; // potision 图形属性配置
    color?: string | any[]; // color 图形属性配置
    shape?: string | any; // shape 图形属性配置
    size?: string | any; // size 图形属性配置
    opacity?: string | any; // opacity 图形属性配置
    label?: string | any; // 图形上文本标记的配置
    tooltip?: string; // 配置 tooltip 上显示的字段名称
    style?: any; // 图形的样式属性配置
    active?: boolean; // 开启关闭 geom active 交互
    select?: any; // geom 选中交互配置
    animate?: any; // 动画配置
}

export interface BarConfig {
    position: string | string[];
    colors: any[];
    shape?: string | any[];
    style?: any;
}

export interface AreaConfig extends BarConfig {
    _?: string;
}

export interface LineConfig extends BarConfig {
    _?: string;
}

export interface PieConfig extends BarConfig {
    coordName?: string;
    radius?: number;
    innerRadius?: number;
}

export enum AlignX {
    LEFT = 'left',
    MIDDLE = 'middle',
    RIGHT = 'right',
}

export enum AlignY {
    TOP = 'top',
    MIDDLE = 'middle',
    BOTTOM = 'bottom',
}

export interface GuideHtml {
    position?: any | any | any[]; // html 的中心位置， 值为原始数据值，支持 callback
    alignX?: 'left' | 'middle' | 'right';
    alignY?: 'top' | 'middle' | 'bottom';
    offsetX?: number;
    offsetY?: number;
    html?: string | any; // html 代码，也支持callback,可能是最大值、最小值之类的判定
    zIndex?: number;
}

export interface Guide {
    line(): any; // 辅助线（可带文本），例如表示平均值或者预期分布的直线；
    image(): any; // 辅助图片，在图表上添加辅助图片；
    text(): any; // 辅助文本，指定位置添加文本说明；
    region(): any; // 辅助框，框选一段图区，设置背景、边框等；
    regionFilter(): any; // 区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色；
    html(html: GuideHtml): any; // 辅助 html，指定位置添加自定义 html，显示自定义信息；
    arc(): any; // 辅助弧线。
    dataMarker(): any; // 特殊数据点标注，多用于折线图和面积图
    dataRegion(): any; // 特殊数据区间标注，多用于折线图和面积图
}

export interface ChartInstance {
    source(data: any[] | any, cfg?: any): ChartInstance;
    scale(field1: any, field2?: any): void;
    guide(): Guide;
    interval(): Geometry;
    line(): Geometry;
    area(): Geometry;
    point(): Geometry;
    position(position: string | string[]): Geometry;
    style(field1: any, field2?: any): Geometry;
    legend(field1: any, field2?: any): Geometry;
    simpleBar(config: BarConfig): any;
    simpleLine(config: LineConfig): any;
    simpleArea(config: AreaConfig): any;
    simplePie(config: PieConfig): any;
    render(): any;
    coord(type: string, config: any): any;
    tooltip(config: any): any;
    intervalStack(): Geometry;
}

export interface Geometry {
    position(position: string | string[]): Geometry;
    color(field?: string, colors?: string | string[] | any): Geometry;
    shape(field: string, shapes?: string | string[] | any): Geometry;
    tooltip(show: boolean): Geometry;
    style(field1: any, field2?: any): Geometry;
    label(field1: any, field2?: any): Geometry;
}
