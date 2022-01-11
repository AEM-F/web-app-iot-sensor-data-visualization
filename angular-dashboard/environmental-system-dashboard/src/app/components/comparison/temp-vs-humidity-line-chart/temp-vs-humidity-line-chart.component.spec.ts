import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempVsHumidityLineChartComponent } from './temp-vs-humidity-line-chart.component';

describe('TempVsHumidityLineChartComponent', () => {
  let component: TempVsHumidityLineChartComponent;
  let fixture: ComponentFixture<TempVsHumidityLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempVsHumidityLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempVsHumidityLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
