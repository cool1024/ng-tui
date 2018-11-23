import { Injectable, Inject } from '@angular/core';
import { ECharts } from './echart.interface';
import { ScriptService } from '../../tui-core/base-services/script.service';
declare const window: any;

@Injectable()
export class EChartService {

    constructor(private script: ScriptService, @Inject('ECHART_SCRIPT_SRC') private src: string, ) { }

    useEChart(handle: (echarts: ECharts) => void) {
        this.script.load(this.src, window.echarts);
        this.script.complete(() => handle(<ECharts>(window.echarts)));
    }
}
