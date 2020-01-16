import { Directive, AfterViewInit, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ScriptService } from '../../tui-core/base-services/script.service';

@Directive({
    selector: '*[tsChart]'
})
export class ChartDirective implements AfterViewInit {

    @Input() option: ChartOption;

    @Output() doInit = new EventEmitter<any>(false);

    private canvas: HTMLCanvasElement;
    private chart: any;

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
            this.doInit.emit(this.chart);
        })
    }

    private prepareScripts() {
        this.scriptService.loads(this.config, !!window['G2']);
    }

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