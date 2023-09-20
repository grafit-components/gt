import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataService} from '../../service/data.service';
import {DataModel} from '../../model/data-model';
import {FilterState, GridColumn, GridOfflineHelper, GridRow} from '@grafit/angular';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.styl']
})
export class DataChartComponent implements OnInit {
  Highcharts = Highcharts;
  private init$ = false;

  chart: Highcharts.Chart;
  update = false;
  chartOptions: Highcharts.Options;
  state$: FilterState = new FilterState();

  @Input()
  set state(value: FilterState) {
    this.state$ = value;
    this.filterData();
  }

  get state() {
    return this.state$;
  }

  @Output() stateChange: EventEmitter<FilterState> = new EventEmitter<FilterState>();

  data: DataModel[] = [];

  constructor(private svc: DataService) {
    this.svc.data.subscribe(_ => {
      this.data = _;
      this.filterData();
    });
  }

  filterData() {
    let result = GridOfflineHelper.filterData(this.data, this.state);
    result = GridOfflineHelper.sortData(result, this.state);
    this.chartOptions = this.getChart(result);
  }

  ngOnInit() {

  }

  chartCallback(chart: Highcharts.Chart) {
    this.chart = chart;
  }

  getChart(data: DataModel[]): Highcharts.Options {
    return {
      credits: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      title: {
        text: ''
      },
      tooltip: {
        animation: false
      },
      xAxis: {
        type: 'category',
        categories: data.map(_ => _.well),
        title: {
          text: ''
        }
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: this.getSeries(data)
    };
  }

  getSeries(data: DataModel[]): any {
    const a = [{
      type: 'line',
      name: 'Qж',
      data: data.map((item) => {
        return {
          name: item.well,
          y: item.liq
        };
      })
    }, {
      type: 'line',
      name: 'Qн',
      data: data.map((item) => {
        return {
          name: item.well,
          y: item.oil
        };
      })
    }, {
      type: 'line',
      name: 'Рпл',
      data: data.map((item) => {
        return {
          name: item.well,
          y: item.pressure
        };
      })
    }];
    return a;
  }
}
