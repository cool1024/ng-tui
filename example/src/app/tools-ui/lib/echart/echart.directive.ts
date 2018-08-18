
import {
    Directive,
    ElementRef,
    Input,
    Output,
    AfterViewInit,
    EventEmitter,
    Inject,
    OnDestroy,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ScriptService } from '../../tui-core/base-services/script.service';
import { EChartsInstance } from './echart.interface';
declare const window: any;

@Directive({
    selector: 'div[tsEchart]',
    exportAs: 'tsEchart',
})

export class BaseEchartDirective implements OnChanges, AfterViewInit, OnDestroy {

    @Input() option: any;

    @Input() resize: boolean;

    @Output() chartLoad = new EventEmitter<{ echartsInstance: EChartsInstance, echarts: any }>();

    private echart: EChartsInstance;

    constructor(
        private script: ScriptService,
        private elementRef: ElementRef,
        @Inject('ECHART_SCRIPT_SRC') private src: string,
    ) {
        this.resize = false;
        this.script.load(this.src, window.echarts);
    }

    resizeChart = () => {
        this.echart.resize();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (this.echart && simpleChanges.option && !simpleChanges.option.firstChange) {
            this.echart.setOption(simpleChanges.option.currentValue || {});
        }
    }

    ngAfterViewInit() {
        this.script.complete(() => {
            this.echart = window.echarts.init(this.elementRef.nativeElement);
            this.echart.setOption(this.option);
            this.chartLoad.emit({
                echartsInstance: this.echart,
                echarts: window.echarts,
            });
            if (this.resize) {
                window.addEventListener('resize', this.resizeChart);
            }
            setTimeout(() => this.echart.resize(), 1000);
        });
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeChart);
    }
}
