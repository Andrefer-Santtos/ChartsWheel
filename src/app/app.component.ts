import { Component, HostListener, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChartsWheel';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 6,
        grid: {
          color: 'transparent',
        },
      },
      y: {
        grid: {
          color: 'red',
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
    ],
    datasets: [
      {
        data: [
          10, 100, 20, 90, 30, 80, 40, 70, 50, 60, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ],
        backgroundColor: [
          'rgba(255,0,0,0.7)',
          'rgba(255,69,0,0.7)',
          'rgba(255,140,0,0.7)',
          'rgba(255,215,0,0.7)',
          'rgba(50,205,50,0.7)',
          'rgba(0,128,0,0.7)',
          'rgba(47,79,79,0.7)',
          'rgba(220,20,60,0.7)',
          'rgba(255,20,147,0.7)',
          'rgba(255,0,255,0.7)',
          'rgba(0,206,209,0.7)',
          'rgba(30,144,255,0.7)',
          'rgba(25,25,112,0.7)',
          'rgba(75,0,130,0.7)',
          'rgba(220,220,220,0.7)',
        ],
        borderColor: [
          'rgba(255,0,0)',
          'rgba(255,69,0)',
          'rgba(255,140,0)',
          'rgba(255,215,0)',
          'rgba(50,205,50)',
          'rgba(0,128,0)',
          'rgba(47,79,79)',
          'rgba(220,20,60)',
          'rgba(255,20,147)',
          'rgba(255,0,255)',
          'rgba(0,206,209)',
          'rgba(30,144,255)',
          'rgba(25,25,112)',
          'rgba(75,0,130)',
          'rgba(220,220,220)',
        ],
        borderWidth: 3,
      },
    ],
  };

  @HostListener('mousewheel', ['$event'])
  onMousewheel(event: WheelEvent) {
    if (event.deltaY > 0) {
      if (
        this.barChartOptions?.scales?.['x']?.max! >=
        this.barChartData.datasets.length
      ) {
        this.barChartOptions?.scales?.['x']?.min =
          this.barChartData.datasets.length - 7;
        this.barChartOptions?.scales?.['x']?.max =
          this.barChartData.datasets.length;
      } else {
        (!this.barChartOptions?.scales?.['x']?.min) += 1;
        (!this.barChartOptions?.scales?.['x']?.max) += 1;
      }
    } else if (event.deltaY < 0) {
      if ((this.barChartOptions?.scales?.['x']?.min as number) <= 0) {
        this.barChartOptions?.scales?.['x']?.min = 0;
        this.barChartOptions?.scales?.['x']?.max = 6;
      } else {
        (this.barChartOptions?.scales?.['x']?.min as number) -= 1;
        (this.barChartOptions?.scales?.['x']?.max as number) -= 1;
      }
    } else {
      //RIP
    }
    this.chart?.update();
  }
}
