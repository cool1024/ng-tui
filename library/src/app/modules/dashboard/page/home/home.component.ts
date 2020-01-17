import { Component, Input } from '@angular/core';
import { ChartInstance } from 'projects/ng-tui/src/public_api';

@Component({
    selector: 'dashboard-login',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    data: any[] = []

    constructor() { }

    initBarChart(chart: ChartInstance) {
        chart.simpleBar({
            position: 'genre*sold',
            colors: ['red']
        });
        this.data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];
    }

    initLineChart(chart: ChartInstance) {
        chart.simpleLine({
            position: 'genre*sold',
            colors: ['red']
        });
        this.data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];
    }
}
