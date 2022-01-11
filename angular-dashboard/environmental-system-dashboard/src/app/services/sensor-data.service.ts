import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private baseUrl = environment.apiBaseUrl + '/api/sensor_values';

  constructor(private http: HttpClient) { }

  public getAllSensorValues(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
}
