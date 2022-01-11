import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureLineChartComponent } from './pressure-line-chart.component';

describe('PressureLineChartComponent', () => {
  let component: PressureLineChartComponent;
  let fixture: ComponentFixture<PressureLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressureLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressureLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
