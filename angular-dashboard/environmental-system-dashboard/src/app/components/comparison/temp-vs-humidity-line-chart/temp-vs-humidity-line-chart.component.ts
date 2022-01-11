import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SensorValue} from "../../../common/SensorValue";
import {ChartConfiguration, ChartOptions, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-temp-vs-humidity-line-chart',
  templateUrl: './temp-vs-humidity-line-chart.component.html',
  styleUrls: ['./temp-vs-humidity-line-chart.component.css']
})
export class TempVsHumidityLineChartComponent implements OnInit {

  @Input() public data: SensorValue[] = [];
  private label:string =  "Temperature";
  private backgroundColor:string = "rgba(255,0,0,0.3)";
  private borderColor:string = "red";
  private pointBackgroundColor:string = "rgba(255,0,0,1)";
  private pointBorderColor:string = "#fff";
  private pointHoverBackgroundColor:string = "#fff";
  private pointHoverBorderColor:string = "rgba(148,159,177,0.8)";
  private fill:string = "origin";
  public dataTemp:ChartConfiguration['data'] = {
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
      },
      {
        data:[],
        label: "Humidity",
        backgroundColor: "rgba(0,115,255,0.3)",
        borderColor: "rgba(0,115,255,1)",
        pointBackgroundColor: "rgba(0,115,255,1)",
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
      this.dataTemp.datasets[0].data = [];
      this.dataTemp.datasets[1].data = [];
      this.dataTemp.labels = [];
      // sort asc
      let compareDate = function (item1:SensorValue, item2: SensorValue) {
        let item1Date = new Date(item1.sample_time).getTime();
        let item2Date = new Date(item2.sample_time).getTime();
        return item1Date > item2Date ? 1 : -1;
      }
      this.data = this.data.sort(compareDate);
      for (let datum of this.data) {
        this.pushOne(datum.temperature,datum.humidity,datum.sample_time.toISOString());
      }
    }
  }

  public pushOne(valueTemp:number,valueHum:number,label:string): void {
    this.dataTemp.datasets[0].data.push(valueTemp);
    this.dataTemp.datasets[1].data.push(valueHum);
    this.dataTemp?.labels?.push(label);

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
