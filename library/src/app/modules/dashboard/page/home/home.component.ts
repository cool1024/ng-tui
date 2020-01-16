import { Component, Input } from '@angular/core';

@Component({
    selector: 'dashboard-login',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor() { }

    initChart(chart: any) {
        console.log(11111);
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];
        chart.source(data);
        chart.interval()
            .position('genre*sold')
            .color('genre');
        chart.render();
    }
}
