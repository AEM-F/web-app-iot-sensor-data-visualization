import { Component, OnInit } from '@angular/core';
import {SensorDataService} from "../../services/sensor-data.service";
import {SensorValue} from "../../common/SensorValue";

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  isLoadingData: boolean = false;
  error:any;
  public sensorValues: SensorValue[] = [];

  constructor(private sensorService: SensorDataService) { }

  expirationCounter: string = "";
  startTimer(secsToStart:number): void {
    let start: number = secsToStart;
    let h: number;
    let m: number;
    let s: number;
    let temp: number;
    let timer: any = setInterval(() =>
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
        clearInterval(timer);
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
