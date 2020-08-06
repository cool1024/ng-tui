/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   app-view.component.ts
 * @date   2019-1-4 17:12:15
 */
import { Component, OnInit } from '@angular/core';
import { EChartsInstance } from 'ng-tui';

@Component({
    templateUrl: './app-view.component.html',
    styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {

    chart: { echartsInstance: EChartsInstance, echarts: any };

    apiTotalData: any = {
        grid: {
            left: 50,
            right: 10,
        },
        legend: {
            data: ['本地图片上传', '本地文件上传', 'OSS上传'],
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
                name: '本地图片上传',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: { color: 'rgba(255,99,132,1)' }
                },
                areaStyle: { color: 'rgba(255,99,132,0.5)' },
                data: []
            },
            {
                name: '本地文件上传',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: { color: 'rgba(54, 162, 235, 1)' }
                },
                areaStyle: { color: 'rgba(54, 162, 235, 0.5)' },
                data: []
            },
            {
                name: 'OSS上传',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: { color: 'rgba(255, 206, 86, 1)' }
                },
                areaStyle: { color: 'rgba(255, 206, 86, 0.5)' },
                data: []
            }
        ]
    };

    constructor() { }

    ngOnInit() {
        this.apiTotalData.xAxis.data = ['2019/01/01', '2019/01/02', '2019/01/03', '2019/01/04', '2019/01/05', '2019/01/06', '2019/01/07'];
        this.apiTotalData.series[0].data = [10, 3, 12, 6, 1, 3, 4];
        this.apiTotalData.series[1].data = [10, 3, 12, 6, 1, 3, 4].reverse();
        this.apiTotalData.series[2].data = [4, 6, 7, 2, 3, 2, 2];
        // tslint:disable-next-line:no-unused-expression
        this.chart && this.chart.echartsInstance.setOption(this.apiTotalData);
    }
}
