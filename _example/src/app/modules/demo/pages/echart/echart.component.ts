import { Component } from '@angular/core';
import { EChartService, EChartsInstance, ECharts } from 'ng-tui';
import { RequestService } from '../../../../cores/services';

@Component({
    templateUrl: './echart.component.html',
})
export class EchartComponent {

    optionThree: any = {
        xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
                inside: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
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
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {},
                    emphasis: {}
                },
                data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
            },
            {
                type: 'line',
                itemStyle: {
                    normal: { color: '#3e9cff' }
                },
                data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
            }
        ]
    };

    serveDatas: any = { free: 100, us: 100, r: 1 };

    constructor(private echartService: EChartService) {
        this.echartService.useEChart(echarts => {
            this.optionThree.series[1].itemStyle = {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ]
                    )
                }
            };
            this.optionThree = Object.assign({}, this.optionThree);
        });
    }

    randomData() {
        this.optionThree.series[1].data = [
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 500,
        ];
        this.optionThree.series[2].data = this.optionThree.series[1].data;
        this.optionThree = Object.assign({}, this.optionThree);
    }
}
