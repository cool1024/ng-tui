import { Component } from '@angular/core';
import { ChartInstance, ChartOption } from 'projects/ng-tui/src/public_api';
import { config, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    data: any[] = [];
    pieData: any[] = [];

    charOption: ChartOption = {
        height: 70,
        padding: 4,
        options: {
            axes: false
        }
    };

    pieOption: ChartOption = {
        height: 75,
        padding: -13
    };

    constructor() { }

    loadData() {
        of([
            { genre: 'Sports', sold: 44 },
            { genre: 'Strategy', sold: 55 },
            { genre: 'Action', sold: 41 },
            { genre: 'Good', sold: 22 },
            { genre: 'Shooter', sold: 43 },
            { genre: 'Other', sold: 41 },
            { genre: 'Apple', sold: 67 },
            { genre: 'Board', sold: 22 },
            { genre: 'Card', sold: 43 },
            { genre: 'Dog', sold: 21 },
            { genre: 'Egg', sold: 22 },
            { genre: 'Film', sold: 41 },
            { genre: 'Greet', sold: 56 },
            { genre: 'Hello', sold: 27 },
            { genre: 'Ill', sold: 43 }
        ]).pipe(delay(1000)).subscribe(data => {
            this.data = data;
            this.pieData = [data[0], data[1], data[3]];
        });
    }

    initBarChart(chart: ChartInstance) {
        chart.simpleBar({
            position: 'genre*sold',
            colors: ['#007bff']
        });
        this.loadData();
    }

    initLineChart(chart: ChartInstance) {
        const lineConfig = {
            position: 'genre*sold',
            colors: ['#007bff'],
            shape: 'smooth'
        }
        const areaConfig = { ...lineConfig, colors: ['l(90) 0:#007bff 1:#ffffff'] };
        chart.simpleLine(lineConfig);
        chart.simpleArea(areaConfig);
        this.loadData();

    }

    initPieChart(chart: ChartInstance) {
        chart.simplePie({
            radius: 0.75,
            innerRadius: 0.6,
            position: 'sold',
            colors: ['#007bff'],
            style: {
                lineWidth: 2,
                stroke: '#fff'
            }
        });
        this.loadData();
    }
}
