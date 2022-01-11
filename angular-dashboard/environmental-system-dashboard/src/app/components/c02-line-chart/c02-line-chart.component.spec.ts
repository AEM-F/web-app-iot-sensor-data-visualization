import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C02LineChartComponent } from './c02-line-chart.component';

describe('C02LineChartComponent', () => {
  let component: C02LineChartComponent;
  let fixture: ComponentFixture<C02LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C02LineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C02LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
