import { Component, OnInit } from '@angular/core';
import {SensorValue} from "../../../common/SensorValue";
import {SensorDataService} from "../../../services/sensor-data.service";

@Component({
  selector: 'app-regression-charts',
  templateUrl: './regression-charts.component.html',
  styleUrls: ['./regression-charts.component.css']
})
export class RegressionChartsComponent implements OnInit {
  isLoadingData: boolean = false;
  error:any;
  public sensorValues: SensorValue[] = [];
  constructor(private sensorService: SensorDataService) { }

  ngOnInit(): void {
    this.handleListValues();
  }

  handleListValues(){
    this.isLoadingData = true;
    this.isLoadingData = false;
    this.sensorValues = [];
    // start test data
    // let sensorValue: SensorValue = new SensorValue(
    //         new Date(),
    //         22.3,
    //         47,
    //         20003,
    //         400,
    //         0
    //       );
    // this.sensorValues.push(sensorValue);
    // let sensorValue2: SensorValue = new SensorValue(
    //   new Date(),
    //   25.5,
    //   65,
    //   20000,
    //   417,
    //   1
    // );
    // this.sensorValues.push(sensorValue2);
    // let sensorValue3: SensorValue = new SensorValue(
    //   new Date(),
    //   28,
    //   73,
    //   20103,
    //   450,
    //   14
    // );
    // this.sensorValues.push(sensorValue3);
    // let sensorValue4: SensorValue = new SensorValue(
    //   new Date(),
    //   9,
    //   73,
    //   20103,
    //   480,
    //   20
    // );
    // this.sensorValues.push(sensorValue4);
    // end test data
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
    });
  }

  onHandleError():void{
    this.error = null;
  }

}
