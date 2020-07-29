import { Component, Input } from '@angular/core';
import { ChartInstance, Position, Item } from 'projects/ng-tui/src/public_api';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    tabItems = ['111', '222', '3333']

    data: any[] = []

    constructor() { }

    loadData() {
        of([
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ]).pipe(delay(1000)).subscribe(data => this.data = data);
    }

    initBarChart(chart: ChartInstance) {
        chart.simpleBar({
            position: 'genre*sold',
            colors: ['red']
        });
        this.loadData();
    }

    initLineChart(chart: ChartInstance) {
        chart.simpleLine({
            position: 'genre*sold',
            colors: ['red']
        });
        this.loadData();

    }

    initPieChart(chart: ChartInstance) {
        chart.simplePie({
            radius: 0.75,
            innerRadius: 0.6,
            position: 'sold',
            colors: ['genre'],
            style: {
                lineWidth: 2,
                stroke: '#fff'
            }
        });
        this.loadData();
    }
}
