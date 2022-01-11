import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureLineChartComponent } from './temperature-line-chart.component';

describe('TemperatureLineChartComponent', () => {
  let component: TemperatureLineChartComponent;
  let fixture: ComponentFixture<TemperatureLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
