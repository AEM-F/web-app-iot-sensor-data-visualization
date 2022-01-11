export class SensorValue{
  public constructor(public sample_time: Date,
                     public temperature: number,
                     public humidity: number,
                     public pressure:number,
                     public c02:number,
                     public tvoc:number) {
  }
}
