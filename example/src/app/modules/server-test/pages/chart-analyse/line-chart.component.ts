import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService, EChartsInstance } from 'ng-tui';
import { ChartDataModalComponent } from './chart-data.modal';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-line-chart',
    templateUrl: 'line-chart.component.html'
})
export class LineChartComponent {

    @Output() close = new EventEmitter<void>();

    chart: { echartsInstance: EChartsInstance, echarts: any };

    backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];

    borderColors = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    lineOption: any = {
        grid: {
            left: 50,
            right: 10,
        },
        legend: {
            data: ['数据'],
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
                name: '数据',
                type: 'line',
                itemStyle: {
                    normal: { color: '#3e9cff' }
                },
                areaStyle: {},
                data: []
            }
        ]
    };

    constructor(private modal: ModalService) {

    }

    exportJsonFile() {
        const jsonStr = JSON.stringify(this.lineOption);
        const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, new Date().getTime() + '.txt');
    }

    importJsonFile(file: File) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            try {
                this.lineOption = JSON.parse(<string>reader.result);
                this.chart.echartsInstance.setOption(this.lineOption);
            } catch (error) {
                console.log(error);
            }
        });
        reader.readAsText(file);
    }

    showDataEditModal() {
        const modalHandle = this.modal.create(ChartDataModalComponent, { center: true });
        modalHandle.instance.dataRows = this.lineOption.series.map(row => ({ title: row.name, data: row.data.join() }));
        modalHandle.open().subscribe(res => {
            const dataRows = res.dataRows;
            this.lineOption.series = [];
            this.lineOption.series.push(...dataRows.map((data, i) => ({
                type: 'line',
                name: data.title,
                itemStyle: {
                    normal: { color: this.borderColors[i] }
                },
                areaStyle: { color: this.backgroundColors[i] },
                data: data.data
            })));
            this.lineOption.legend.data = dataRows.map(data => data.title);
            this.lineOption.xAxis.data = res.labels;
            this.chart.echartsInstance.setOption(this.lineOption);
        });
    }
}
