import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureDistChartComponent } from './temperature-dist-chart.component';

describe('TemperatureDistChartComponent', () => {
  let component: TemperatureDistChartComponent;
  let fixture: ComponentFixture<TemperatureDistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureDistChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureDistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
