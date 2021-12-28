import { Component } from '@angular/core';
import { ChartInstance, ChartOption, requestObject } from 'ng-tui';

@Component({
  templateUrl: './home.page.html',
})
export class HomePageComponent {
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
    { x: 'F', y: 41 },
  ];

  rateData: Array<{ time: string; rate: number }> = [];

  charOption: ChartOption = {
    height: 70,
    padding: 4,
    options: {
      axes: false,
      tooltip: false,
    },
  };

  bigCharOption: ChartOption = {
    height: 300,
    padding: [5, 5, 30, 30],
  };

  pieOption: ChartOption = {
    height: 320,
    padding: 50,
    data: [
      { x: 'A', y: 44 },
      { x: 'B', y: 55 },
      { x: 'C', y: 41 },
      { x: 'D', y: 22 },
    ],
  };

  itemList = [
    {
      name: 'Terrance Moreno',
      description: `Hey! there I'm available.`,
      time: '12.30 PM',
    },
    {
      name: 'Ron Vargas',
      description: `I've finished it! See you so..`,
      time: '12.30 PM',
    },
    {
      name: 'Luke Cook',
      description: `This template is awesome!`,
      time: '02.14 AM',
    },
    {
      name: 'Joyce Freeman',
      description: `Nice to meet you`,
      time: '08.22 PM',
    },
    {
      name: 'Terrance Moreno',
      description: `Hey! there I'm available...`,
      time: '05.49 AM',
    },
  ];

  tableData = [
    {
      a: 'NobleUI jQuery',
      b: ' 01/01/2020',
      c: '26/04/2020',
      d: 'success',
      e: 'Released Leonardo Payne',
    },
    {
      a: 'NobleUI Angular',
      b: '01/01/2020	',
      c: '26/04/2020',
      d: 'primary',
      e: 'Review Carl Henson',
    },
    {
      a: 'NobleUI ReactJs',
      b: '01/05/2020	',
      c: '10/09/2020',
      d: 'danger',
      e: 'Pending Jensen Combs',
    },
    {
      a: 'NobleUI VueJs',
      b: '01/01/2020',
      c: '	31/11/2020',
      d: 'info',
      e: 'Work in Progress Amiah Burton',
    },
    {
      a: 'NobleUI Laravel',
      b: '01/01/2020	',
      c: '31/12/2020',
      d: 'warning',
      e: 'Coming soon Yaretzi Mayo',
    },
    {
      a: 'NobleUI NodeJs',
      b: '01/01/2020',
      c: '31/12/2020',
      d: 'dark',
      e: 'Coming soon	Carl Henson',
    },
    {
      a: 'NobleUI EmberJs',
      b: '01/05/2020	',
      c: '10/11/2020',
      d: 'secondary',
      e: 'Pending	Jensen Combs',
    },
  ];

  constructor() {}

  initLineChart(chart: ChartInstance): void {
    const lineConfig = {
      position: 'x*y',
      colors: ['#007bff'],
      shape: 'smooth',
    };
    const areaConfig = { ...lineConfig, colors: ['l(90) 0:#007bff 1:#ffffff'] };
    chart.simpleLine(lineConfig);
    chart.simpleArea(areaConfig);
    chart.render();
  }

  initZLineChart(chart: ChartInstance): void {
    const lineConfig = {
      position: 'x*y',
      colors: ['#007bff'],
    };
    const areaConfig = { ...lineConfig, colors: ['l(90) 0:#007bff 1:#ffffff'] };
    chart.simpleLine(lineConfig);
    chart.simpleArea(areaConfig);
  }

  initBarChart(chart: ChartInstance): void {
    chart.simpleBar({
      position: 'x*y',
      colors: ['l(90) 0:#007bff 1:#ffffff'],
    });
  }

  changeRateData(index: number): void {
    const activeYear = ['', '2013', '2014', '2015', '2016', '2017', '2018'][
      index
    ];
    requestObject(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/income.json'
    ).subscribe((data) => {
      this.rateData = data.filter(
        (item: any) => ~item.time.indexOf(activeYear + '-')
      );
    });
  }

  initRateChart(chart: ChartInstance): void {
    // chart.source(data);
    chart.line().position('time*rate');
    chart.area().position('time*rate').color('l(90) 0:#007bff 1:#ffffff');
    chart.render();
    this.changeRateData(0);
  }

  initPieChart(chart: ChartInstance): void {
    chart.coord('theta', {
      radius: 1,
      innerRadius: 0.6,
    });

    chart.guide().html({
      position: ['50%', '50%'],
      html: '<h5 class="text-muted">10GB</h5>',
      alignX: 'middle',
      alignY: 'middle',
    });

    chart.legend({
      position: 'right',
      itemGap: 20,
    });

    chart
      .intervalStack()
      .position('y')
      .style({ lineWidth: 2, stroke: '#fff' })
      .color('x', ['#007bff', '#3596fd', '#78b9ff', '#d1e7ff'])
      .label('y', {
        formatter: (val: number, item: any) => item.point.x + ': ' + val,
      })
      .tooltip(false);

    chart.render();
  }
}
