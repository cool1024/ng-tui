import { Component } from '@angular/core';
import { ChartInstance, ChartOption, DropMenuItem, MenuService, Position } from 'projects/ng-tui/src/public_api';

@Component({
    templateUrl: './home.component.html',
    styles: [`
        .row {
            margin-right: -8px !important;
            margin-left: -8px !important;
        }
        .col-md-4, .col-lg-7, .col-xl-8, .col-lg-5, .col-xl-4 {
            padding-right: 8px !important;
            padding-left: 8px !important;
        }
    `]
})
export class HomeComponent {

    lineData = [
        { x: 'A', y: 22 },
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
        { x: 'O', y: 43 },
        { x: 'P', y: 22 },
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

    bigCharOption: ChartOption = {
        tooltip: false,
        height: 300,
        padding: 30,
        options: {
            // axes: true
        }
    };

    pieOption: ChartOption = {
        tooltip: false,
        height: 300,
        // padding: -3,
        options: {
            // axes: false,
            geoms: [
                {
                    label: 'y',
                    tooltip: false,
                }
            ]
        }
    };

    constructor(private menuService: MenuService) { }

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
            innerRadius: 0.6,
            position: 'y',
            colors: ['x', ['#007bff', '#3596fd', '#78b9ff']],
            style: {
                lineWidth: 2,
                stroke: '#fff'
            }
        });
    }

    showMenu(dom: HTMLElement) {
        const menuItems = [
            DropMenuItem.label('Detail'),
            DropMenuItem.label('Remove'),
            DropMenuItem.label('Top'),
        ];
        const menuConfig = { position: Position.AUTO };
        this.menuService.showMenu(dom, menuItems, menuConfig);
    }
}
