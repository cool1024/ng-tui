import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EChartsInstance, ModalService, ToastService } from 'ng-tui';
import { RequestService, GlobalService } from 'src/app/cores/services';
import { ApiAddComponent } from './api-add.component';
import { Observable, concat, of } from 'rxjs';
import { ApiData } from 'src/app/cores/classes';
import { map, delay } from 'rxjs/operators';

@Component({
    selector: 'app-api-chart',
    templateUrl: 'api-chart.component.html'
})
export class ApiChartComponent {

    @Input() apiTest: { url: string, method: string, params: string, testNum: number };

    @Output() close = new EventEmitter<void>();

    chart: { echartsInstance: EChartsInstance, echarts: any };

    apiResults: Array<ApiData> = [];

    lineOption: any = {
        grid: {
            left: 50,
            right: 10,
        },
        legend: {
            data: ['连续测试统计'],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        xAxis: {
            boundaryGap: false,
            data: [],
        },
        yAxis: {
            axisLine: {
                show: true

            },
            axisTick: {
                show: true
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                name: '连续测试统计',
                type: 'line',
                itemStyle: {
                    normal: { color: '#3e9cff' }
                },
                areaStyle: {},
                data: []
            }
        ]
    };

    constructor(
        private request: RequestService,
        private global: GlobalService,
        private modal: ModalService,
        private toast: ToastService,
    ) { }

    get errorNum(): number {
        return this.apiResults.filter(apiRes => !apiRes.result).length;
    }

    get successNum(): number {
        return this.apiResults.length - this.errorNum;
    }

    get maxTime(): number {
        let max = 0;
        this.apiResults.forEach(apiRes => max = apiRes.requestTime > max ? apiRes.requestTime : max);
        return max;
    }

    get minTime(): number {
        let min = (this.apiResults[0] || { requestTime: 0 }).requestTime;
        this.apiResults.forEach(apiRes => min = apiRes.requestTime < min ? apiRes.requestTime : min);
        return min;
    }

    doApiTest() {
        const requestQuery = [];
        this.lineOption.series[0].data = [];
        this.lineOption.xAxis.data = [];
        this.apiResults = [];
        for (let i = 0; i < this.apiTest.testNum; i++) {
            this.lineOption.xAxis.data.push(i + 1);
            requestQuery.push(this.sendRequest());
        }
        concat<ApiData>(...requestQuery).subscribe(res => {
            this.lineOption.series[0].data.push(res.requestTime);
            this.apiResults.push(res);
            // tslint:disable-next-line:no-unused-expression
            this.chart && this.chart.echartsInstance.setOption(this.lineOption);
        });
    }

    sendRequest(): Observable<ApiData> {
        const headers: any = this.global.getObjectFromStorage('apiTest.headers', {});
        const host = this.global.getStringFromStorage('apiTest.url');
        const request = this.request.withoutHeader.withoutHost.withHeader(headers);
        const method = this.apiTest.method.toLowerCase();
        let params = {};
        try {
            params = JSON.parse(this.apiTest.params || '{}');
        } catch (e) {
            this.toast.warning('参数错误', '请求的参数不是合法的JSON字符串');
        }

        return request[method](host + this.apiTest.url, params, false).pipe(delay(100));
    }

    showEditModal() {
        this.modal.create(ApiAddComponent, { center: true });
        this.modal.instance.apiTest = this.apiTest;
        this.modal.instance.modalTitle = '编辑接口';
        this.modal.open().subscribe(res => this.apiTest = res);
    }
}
