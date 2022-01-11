import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {SensorValue} from "../../../common/SensorValue";

@Component({
  selector: 'app-temperature-vs-humidity-chart',
  templateUrl: './temperature-vs-humidity-chart.component.html',
  styleUrls: ['./temperature-vs-humidity-chart.component.css']
})
export class TemperatureVsHumidityChartComponent implements OnInit {
  @Input() public data: SensorValue[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor() { }

  ngOnInit(): void {
    this.UpdateData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('data') && this.data.length >0) {
      this.UpdateData();
      //console.log(this.barChartData.datasets)
    }
  }

  // scatter
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales:{
      x:{
        title: {
          display: true,
          text: "Humidity"
        },
        grid: {
          color: "rgba(200,200,200, 0.3)"
        },
        min:0
      },
      y:{
        title: {
          display: true,
          text: "Temperature"
        },
        grid: {
          color: "rgba(200,200,200, 0.3)"
        }
      }
    }
  };

  public scatterChartData: ChartData<'scatter'> = {
    labels: [],
    datasets: [
      {
        data: [
        ],
        label: 'Temperature Vs Humidity',
        pointRadius: 8,
        backgroundColor: 'rgba(91,6,250,0.6)',
        borderColor: "rgba(150,150,150)"
      },
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  private UpdateData(){
    if(this.data.length >0){
      this.scatterChartData.datasets[0].data = [];
      // sort asc
      let compareDate = function (item1:SensorValue, item2: SensorValue) {
        let item1Date = new Date(item1.sample_time).getTime();
        let item2Date = new Date(item2.sample_time).getTime();
        return item1Date > item2Date ? 1 : -1;
      }
      // apply sort
      this.data = this.data.sort(compareDate);
      for (let datum of this.data) {
        this.pushOne(datum.humidity,datum.temperature);
      }
    }
  }

  public pushOne(value:number, value2:number): void {
    this.scatterChartData.datasets.forEach((x, i) => {
      x.data.push({x: value, y: value2});
    });

    this.chart?.update();
  }

}
