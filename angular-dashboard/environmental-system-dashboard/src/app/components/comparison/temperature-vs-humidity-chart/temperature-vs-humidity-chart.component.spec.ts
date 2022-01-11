import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureVsHumidityChartComponent } from './temperature-vs-humidity-chart.component';

describe('TemperatureVsHumidityChartComponent', () => {
  let component: TemperatureVsHumidityChartComponent;
  let fixture: ComponentFixture<TemperatureVsHumidityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureVsHumidityChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureVsHumidityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
