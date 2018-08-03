/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   home.component.ts
 * @date   2018-8-1 15:23:36
 */
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    optionOne = {
        grid: {
            left: 0,
            top: 0,
            height: '100%',
            width: '100%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [{
            lineStyle: {
                color: '#007bff',
            },
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
                color: '#007bff',
            },
            itemStyle: {
                color: '#007bff',
            }
        }]
    };

    optionTwo = {
        grid: {
            left: 0,
            top: 0,
            right: 0,
            height: '100%',
            // width: '100%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
            itemStyle: {
                color: '#007bff',
            }
        }]
    };

    optionThree = {
        color: ['#007bff'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'transparent'
                }
            }
        },
        grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            top: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
        ],
        series: [
            {
                name: '销售额',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220, 100, 230, 145, 260, 380]
            }
        ]
    };

    optionFour = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'transparent'
                }
            }
        },
        grid: {
            left: 0,
            top: 10,
            height: '100%',
            width: '100%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [{
            lineStyle: {
                color: '#007bff',
            },
            smooth: 0.4,
            data: [1, 3, 5, 1, 4, 3, 1],
            type: 'line',
            areaStyle: {
                color: 'rgba(0, 123, 255, 0.5)',
            },
            itemStyle: {
                color: '#007bff',
                opacity: 0
            }
        }]
    };

    optionPie = {
        color: ['#ff4255', '#ff9100', '#ffd900', '#2abd87', '#35d1a2', '#44b1c2', '#17a2b8'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [100, 200, 300, 400, 500]
            }
        ]
    };

    constructor() { }

    ngOnInit() {

    }
}
