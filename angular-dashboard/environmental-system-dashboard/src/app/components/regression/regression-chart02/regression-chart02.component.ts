import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SensorValue} from "../../../common/SensorValue";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
// @ts-ignore
import * as regression from 'regression';

@Component({
  selector: 'app-regression-chart02',
  templateUrl: './regression-chart02.component.html',
  styleUrls: ['./regression-chart02.component.css']
})
export class RegressionChart02Component implements OnInit {

  @Input() public data: SensorValue[] = [];
  public regressionData: any = null;
  public predictedValue:string = "";
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
          text: "C02"
        },
        grid: {
          color: "rgba(200,200,200, 0.3)"
        },
        min:0
      },
      y:{
        title: {
          display: true,
          text: "TVOC"
        },
        grid: {
          color: "rgba(200,200,200, 0.3)"
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip:{
        enabled:false
      }
    }
  };

  private pointBackgroundColor:string = "#85e21b";
  private pointBorderColor:string = "#fff";
  private lineColor:string = "#78e21b";

  public scatterChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [
        ],
        label: 'TVOC Vs C02',
        pointRadius: 8,
        backgroundColor: 'rgba(250,120,6,0.6)',
        borderColor: "rgba(150,150,150)",
        type: 'scatter'
      },
      {
        data:[],
        label: "Regression line",
        borderColor: this.lineColor,
        backgroundColor: 'transparent',
        pointBackgroundColor: this.pointBackgroundColor,
        pointBorderColor: this.pointBorderColor,
        type: 'line'
      }
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  private CleanData(regressionData:any[]): any[]{
    const clean_data = regressionData
      .filter(({ x, y }) => {
        return (
          typeof x === typeof y &&  // filter out one string & one number
          !isNaN(x) &&              // filter out `NaN`
          !isNaN(y) &&
          Math.abs(x) !== Infinity &&
          Math.abs(y) !== Infinity
        );
      })
      .map(({ x, y }) => {
        return [x, y];             // we need a list of [[x1, y1], [x2, y2], ...]
      });
    return clean_data;
  }

  private GenerateRegressionData(){
    this.regressionData = null;
    let regressionData:any[] = [];
    for (let value of this.data) {
      regressionData.push({x: value.c02, y:value.tvoc});
    }
    this.regressionData = regression.linear(this.CleanData(regressionData));
    console.log(this.regressionData);
    for (let i = 0; i < this.regressionData.points.length;i++){
      this.pushOneLinearData(this.regressionData.points[i][0], this.regressionData.points[i][1]);
    }
  }

  private UpdateData(){
    if(this.data.length >0){
      this.scatterChartData.datasets[0].data = [];
      this.scatterChartData.datasets[1].data = [];
      // sort asc
      let compareDate = function (item1:SensorValue, item2: SensorValue) {
        let item1Date = new Date(item1.sample_time).getTime();
        let item2Date = new Date(item2.sample_time).getTime();
        return item1Date > item2Date ? 1 : -1;
      }
      // apply sort
      this.data = this.data.sort(compareDate);
      for (let datum of this.data) {
        this.pushOne(datum.c02,datum.tvoc);
      }
      this.GenerateRegressionData();
      //console.log(this.scatterChartData)
    }
  }

  public pushOne(valueX:number, valueY:number): void {
    this.scatterChartData.datasets[0].data.push({x: valueX, y: valueY});
    this.chart?.update();
  }

  public pushOneLinearData(valueX:number, valueY:number):void{
    //console.log(valueY);
    this.scatterChartData.datasets[1].data.push({x: valueX, y: valueY});
    this.chart?.update();
  }

  public onPredictTVOC(value:string){
    this.predictedValue = "";
    let valueToPredict:number = parseInt(value);
    if(this.regressionData != null && !isNaN(valueToPredict)){
      let prediction = this.regressionData.predict(valueToPredict);
      this.predictedValue = prediction[1].toString();
    }
  }

}
