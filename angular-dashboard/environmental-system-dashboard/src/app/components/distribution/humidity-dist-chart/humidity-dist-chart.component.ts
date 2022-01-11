import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SensorValue} from "../../../common/SensorValue";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";

@Component({
  selector: 'app-humidity-dist-chart',
  templateUrl: './humidity-dist-chart.component.html',
  styleUrls: ['./humidity-dist-chart.component.css']
})
export class HumidityDistChartComponent implements OnInit {

  @Input() data: SensorValue[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        type: "linear",
        offset: false,
        grid: {
          offset: false,
          color: "rgba(200,200,200, 0.5)"
        },
        title: {
          display: true,
          text: "Value"
        },
        min: 0,
        max: 100
      },
      y: {
        grid:{
          color: "rgba(200,200,200, 0.5)"
        },
        title: {
          display: true,
          text: "Count"
        },
        min: 0
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
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [

  ];

  public barChartData: ChartData = {
    datasets: [
      {
        data: [
        ],
        label: 'Humidity distribution',
        barPercentage: 1,
        borderWidth:1,
        categoryPercentage:1,
        backgroundColor: "rgba(0,153,255,0.3)",
        borderColor: "rgba(0,153,255,0.6)",
        hoverBackgroundColor:"rgba(0,153,255,0.9)",
        hoverBorderColor: "rgba(0,153,255,0.6)"
      }
    ]
  };


  constructor() {

  }

  ngOnInit(): void {
    this.UpdateData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('data') && this.data.length >0) {
      this.UpdateData();
     // console.log(this.barChartData.datasets)
    }
  }

  private UpdateData(){
    if(this.data.length >0){
      this.barChartData.datasets[0].data = [];
      // sort asc
      let compareDate = function (item1:SensorValue, item2: SensorValue) {
        let item1Date = new Date(item1.sample_time).getTime();
        let item2Date = new Date(item2.sample_time).getTime();
        return item1Date > item2Date ? 1 : -1;
      }
      this.data = this.data.sort(compareDate);
      const countOccurrences = (arr:SensorValue[], val:number) => arr.reduce((a, v) => (v.humidity === val ? a + 1 : a), 0);
      for (let datum of this.data) {
        this.pushOne(datum.humidity,countOccurrences(this.data, datum.humidity));
      }
    }
  }

  public pushOne(value:number, count:number): void {
    this.barChartData.datasets.forEach((x, i) => {
      x.data.push({x: value, y: count});
    });

    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

}
