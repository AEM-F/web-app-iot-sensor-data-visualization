import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SensorValue} from "../../common/SensorValue";
import {ChartConfiguration, ChartOptions, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-humidity-line-chart',
  templateUrl: './humidity-line-chart.component.html',
  styleUrls: ['./humidity-line-chart.component.css']
})
export class HumidityLineChartComponent implements OnInit {

  @Input() public data: SensorValue[] = [];
  private label:string =  "Humidity";
  private backgroundColor:string = "rgba(0,136,255,0.3)";
  private borderColor:string = "rgba(0,136,255,0.9)";
  private pointBackgroundColor:string = "rgba(148,159,177,1)";
  private pointBorderColor:string = "#fff";
  private pointHoverBackgroundColor:string = "#fff";
  private pointHoverBorderColor:string = "rgba(148,159,177,0.8)";
  private fill:string = "origin";
  public dataHum:ChartConfiguration['data'] = {
    datasets:[
      {
        data:[],
        label: this.label,
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
        pointBackgroundColor: this.pointBackgroundColor,
        pointBorderColor: this.pointBorderColor,
        pointHoverBackgroundColor: this.pointHoverBackgroundColor,
        pointHoverBorderColor: this.pointHoverBorderColor,
        fill: this.fill,

      }
    ],
    labels: []
  };

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      y:{
        grid:{
          color: "rgba(200,200,200, 0.5)"
        },
        title: {
          display: true,
          text: "Value"
        }
      },
      x:{
        grid:{
          color: "rgba(200,200,200, 0.5)"
        },
        title: {
          display: true,
          text: "DateTime"
        }
      }
    }
  };

  lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {

  }

  private UpdateData(){
    if(this.data.length >0){
      this.dataHum.datasets[0].data = [];
      this.dataHum.labels = [];
      // sort asc
      let compareDate = function (item1:SensorValue, item2: SensorValue) {
        let item1Date = new Date(item1.sample_time).getTime();
        let item2Date = new Date(item2.sample_time).getTime();
        return item1Date > item2Date ? 1 : -1;
      }
      this.data = this.data.sort(compareDate);
      for (let datum of this.data) {
        this.pushOne(datum.humidity,datum.sample_time.toISOString());
      }
    }
  }

  public pushOne(value:number, label:string): void {
    this.dataHum.datasets.forEach((x, i) => {
      x.data.push(value);
    });
    this.dataHum?.labels?.push(label);

    this.chart?.update();
  }

  // @ts-ignore
  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty('data') && this.data.length >0) {
      this.UpdateData();
    }
  }


  ngOnInit(): void {
    this.UpdateData();
  }

}
