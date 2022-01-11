import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityDistChartComponent } from './humidity-dist-chart.component';

describe('HumidityDistChartComponent', () => {
  let component: HumidityDistChartComponent;
  let fixture: ComponentFixture<HumidityDistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumidityDistChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityDistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
