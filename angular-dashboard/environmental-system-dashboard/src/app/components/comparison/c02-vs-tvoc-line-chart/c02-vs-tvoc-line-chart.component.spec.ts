import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C02VsTvocLineChartComponent } from './c02-vs-tvoc-line-chart.component';

describe('C02VsTvocLineChartComponent', () => {
  let component: C02VsTvocLineChartComponent;
  let fixture: ComponentFixture<C02VsTvocLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C02VsTvocLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C02VsTvocLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
