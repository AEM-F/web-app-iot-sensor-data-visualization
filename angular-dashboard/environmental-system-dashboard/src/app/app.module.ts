import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperatureLineChartComponent } from './components/temperature-line-chart/temperature-line-chart.component';
import { HumidityLineChartComponent } from './components/humidity-line-chart/humidity-line-chart.component';
import { PressureLineChartComponent } from './components/pressure-line-chart/pressure-line-chart.component';
import { C02LineChartComponent } from './components/c02-line-chart/c02-line-chart.component';
import { TvocLineChartComponent } from './components/tvoc-line-chart/tvoc-line-chart.component';
import { TemperatureVsHumidityChartComponent } from './components/comparison/temperature-vs-humidity-chart/temperature-vs-humidity-chart.component';
import { TvocVsC02ChartComponent } from './components/comparison/tvoc-vs-c02-chart/tvoc-vs-c02-chart.component';
import { TemperatureDistChartComponent } from './components/distribution/temperature-dist-chart/temperature-dist-chart.component';
import { HumidityDistChartComponent } from './components/distribution/humidity-dist-chart/humidity-dist-chart.component';
import { C02DistChartComponent } from './components/distribution/c02-dist-chart/c02-dist-chart.component';
import { TvocDistChartComponent } from './components/distribution/tvoc-dist-chart/tvoc-dist-chart.component';
import { PressureDistChartComponent } from './components/distribution/pressure-dist-chart/pressure-dist-chart.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { DistributionChartsComponent } from './components/distribution-charts/distribution-charts.component';
import { ComparisonChartsComponent } from './components/comparison-charts/comparison-charts.component';
import {SensorDataService} from "./services/sensor-data.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgChartsModule} from "ng2-charts";
import { AllValuesLineChartComponent } from './components/comparison/all-values-line-chart/all-values-line-chart.component';
import { TempVsHumidityLineChartComponent } from './components/comparison/temp-vs-humidity-line-chart/temp-vs-humidity-line-chart.component';
import { C02VsTvocLineChartComponent } from './components/comparison/c02-vs-tvoc-line-chart/c02-vs-tvoc-line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureLineChartComponent,
    HumidityLineChartComponent,
    PressureLineChartComponent,
    C02LineChartComponent,
    TvocLineChartComponent,
    TemperatureVsHumidityChartComponent,
    TvocVsC02ChartComponent,
    TemperatureDistChartComponent,
    HumidityDistChartComponent,
    C02DistChartComponent,
    TvocDistChartComponent,
    PressureDistChartComponent,
    MetricsComponent,
    DistributionChartsComponent,
    ComparisonChartsComponent,
    AllValuesLineChartComponent,
    TempVsHumidityLineChartComponent,
    C02VsTvocLineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [SensorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
