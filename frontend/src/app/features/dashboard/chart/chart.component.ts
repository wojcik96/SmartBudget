import { Component } from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("chart-box", {
      type: 'bar',

      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: "Income",
            data: [
              '4670',
              '5760',
              '5720',
              '790',
              '920',
              '5740',
              '5730',
              '5760',
              '5346',
              '4353',
              '3132',
              '2342'
            ],
            backgroundColor: '#198754'
          },
          {
            label: "Expenses",
            data: [
              '542',
              '542',
              '536',
              '327',
              '17',
              '0.00',
              '538',
              '541',
              '0.00',
              '538',
              '541',
              '3123'
            ],
            backgroundColor: '#dc3545'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
      }

    });
  }

}
