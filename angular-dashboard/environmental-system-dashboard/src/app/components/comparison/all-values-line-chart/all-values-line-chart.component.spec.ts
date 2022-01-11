import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllValuesLineChartComponent } from './all-values-line-chart.component';

describe('AllValuesLineChartComponent', () => {
  let component: AllValuesLineChartComponent;
  let fixture: ComponentFixture<AllValuesLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllValuesLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllValuesLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
