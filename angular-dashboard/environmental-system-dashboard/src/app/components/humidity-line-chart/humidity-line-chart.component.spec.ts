import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityLineChartComponent } from './humidity-line-chart.component';

describe('HumidityLineChartComponent', () => {
  let component: HumidityLineChartComponent;
  let fixture: ComponentFixture<HumidityLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumidityLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
