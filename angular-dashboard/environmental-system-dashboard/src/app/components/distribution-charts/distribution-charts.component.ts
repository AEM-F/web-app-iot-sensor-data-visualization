import {Component, OnDestroy, OnInit} from '@angular/core';
import {SensorValue} from "../../common/SensorValue";
import {SensorDataService} from "../../services/sensor-data.service";

@Component({
  selector: 'app-distribution-charts',
  templateUrl: './distribution-charts.component.html',
  styleUrls: ['./distribution-charts.component.css']
})
export class DistributionChartsComponent implements OnInit,OnDestroy {

  isLoadingData: boolean = false;
  error:any;
  public sensorValues: SensorValue[] = [];
  timer:any;

  constructor(private sensorService: SensorDataService) { }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    }

  expirationCounter: string = "";
  startTimer(secsToStart:number): void {
    let start: number = secsToStart;
    let h: number;
    let m: number;
    let s: number;
    let temp: number;
    this.timer = setInterval(() =>
    {
      h = Math.floor(start / 60 / 60)
      // remove the hours
      temp = start - h * 60 * 60;
      m = Math.floor(temp / 60);
      // remove the minuets
      temp = temp - m * 60;
      // what left is the seconds
      s = temp;

      // add leading zeros for aesthetics
      var hour = h < 10 ? "0" + h : h;
      var minute = m < 10 ? "0" + m : m;
      var second = s < 10 ? "0" + s : s;

      this.expirationCounter = hour + ":" + minute + ":" + second;

      if (start <= 0) {
        // Time elapsed
        clearInterval(this.timer);
        this.expirationCounter = "Expired";
        // Make here changes in gui when time elapsed
        this.handleListValues();
        this.startTimer(60);
      }
      start--;
    }, 1000)
  }

  ngOnInit(): void {
    this.handleListValues();
    this.startTimer(60);
  }

  handleListValues(){
    this.isLoadingData = true;
    this.sensorService.getAllSensorValues().subscribe({
      next: (data)=>{
        this.isLoadingData = false;
        this.sensorValues = [];
        //console.log(data);
        for (let sensorValueRes of data){
          let date = new Date(+sensorValueRes.sample_time);
          let sensorValue: SensorValue = new SensorValue(
            date,
            sensorValueRes.device_data.temperature,
            sensorValueRes.device_data.humidity,
            sensorValueRes.device_data.pressure,
            sensorValueRes.device_data.c02,
            sensorValueRes.device_data.tvoc
          );
          this.sensorValues.push(sensorValue);
        }
        //console.log(this.sensorValues);
      },
      error: (error) =>{
        this.isLoadingData = false;
        this.error = error.error.message;
      }
    })
  }

  onHandleError():void{
    this.error = null;
  }

}
