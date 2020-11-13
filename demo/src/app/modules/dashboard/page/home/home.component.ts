import { Component } from '@angular/core';
import { ChartInstance, ChartOption } from 'projects/ng-tui/src/public_api';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    lineData = [
        { x: 'A', y: 44 },
        { x: 'B', y: 55 },
        { x: 'C', y: 41 },
        { x: 'D', y: 22 },
        { x: 'E', y: 43 },
        { x: 'F', y: 41 },
        { x: 'G', y: 67 },
        { x: 'H', y: 22 },
        { x: 'I', y: 43 },
        { x: 'J', y: 21 },
        { x: 'K', y: 22 },
        { x: 'L', y: 41 },
        { x: 'M', y: 56 },
        { x: 'N', y: 27 },
        { x: 'O', y: 43 }
    ];

    barData = [
        { x: 'A', y: 44 },
        { x: 'B', y: 55 },
        { x: 'C', y: 41 },
        { x: 'D', y: 22 },
        { x: 'E', y: 43 },
        { x: 'F', y: 41 }
    ];

    pieData = [
        { x: 'A', y: 44 },
        { x: 'B', y: 55 },
        { x: 'C', y: 41 },
        { x: 'D', y: 22 },
        { x: 'E', y: 43 },
        { x: 'F', y: 41 }
    ];

    itemList = [
        { name: 'Terrance Moreno', description: `Hey! there I'm available.`, time: '12.30 PM' },
        { name: 'Ron Vargas', description: `I've finished it! See you so..`, time: '12.30 PM' },
        { name: 'Luke Cook', description: `This template is awesome!`, time: '02.14 AM' },
        { name: 'Joyce Freeman', description: `Nice to meet you`, time: '08.22 PM' },
        { name: 'Terrance Moreno', description: `Hey! there I'm available...`, time: '05.49 AM' }
    ];

    tableData = [
        { a: 'NobleUI jQuery', b: ' 01/01/2020', c: '26/04/2020', d: 'success', e: 'Released Leonardo Payne' },
        { a: 'NobleUI Angular', b: '01/01/2020	', c: '26/04/2020', d: 'primary', e: 'Review Carl Henson' },
        { a: 'NobleUI ReactJs', b: '01/05/2020	', c: '10/09/2020', d: 'danger', e: 'Pending Jensen Combs' },
        { a: 'NobleUI VueJs', b: '01/01/2020', c: '	31/11/2020', d: 'info', e: 'Work in Progress Amiah Burton' },
        { a: 'NobleUI Laravel', b: '01/01/2020	', c: '31/12/2020', d: 'warning', e: 'Coming soon Yaretzi Mayo' },
        { a: 'NobleUI NodeJs', b: '01/01/2020', c: '31/12/2020', d: 'dark', e: 'Coming soon	Carl Henson' },
        { a: 'NobleUI EmberJs', b: '01/05/2020	', c: '10/11/2020', d: 'secondary', e: 'Pending	Jensen Combs' }
    ]

    charOption: ChartOption = {
        tooltip: false,
        height: 70,
        padding: 4,
        options: {
            axes: false
        }
    };

    pieOption: ChartOption = {
        tooltip: false,
        height: 75,
        padding: -3,
        options: {
            axes: false
        }
    };

    initLineChart(chart: ChartInstance) {
        const lineConfig = {
            position: 'x*y',
            colors: ['#007bff'],
            shape: 'smooth'
        }
        const areaConfig = { ...lineConfig, colors: ['l(90) 0:#007bff 1:#ffffff'] };
        chart.simpleLine(lineConfig);
        chart.simpleArea(areaConfig);
    }

    initZLineChart(chart: ChartInstance) {
        const lineConfig = {
            position: 'x*y',
            colors: ['#007bff'],
        }
        const areaConfig = { ...lineConfig, colors: ['l(90) 0:#007bff 1:#ffffff'] };
        chart.simpleLine(lineConfig);
        chart.simpleArea(areaConfig);
    }

    initBarChart(chart: ChartInstance) {
        chart.simpleBar({
            position: 'x*y',
            colors: ['l(90) 0:#007bff 1:#ffffff']
        });
    }

    initPieChart(chart: ChartInstance) {
        chart.simplePie({
            coordName: 'polar',
            innerRadius: 0.2,
            position: 'x*y',
            colors: ['x', ['#007bff', '#3596fd', '#78b9ff']],
            style: {
                lineWidth: 2,
                stroke: '#fff'
            }
        });
    }
}
