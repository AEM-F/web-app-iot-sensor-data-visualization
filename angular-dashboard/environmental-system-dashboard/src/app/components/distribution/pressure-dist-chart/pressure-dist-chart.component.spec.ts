import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureDistChartComponent } from './pressure-dist-chart.component';

describe('PressureDistChartComponent', () => {
  let component: PressureDistChartComponent;
  let fixture: ComponentFixture<PressureDistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressureDistChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressureDistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
