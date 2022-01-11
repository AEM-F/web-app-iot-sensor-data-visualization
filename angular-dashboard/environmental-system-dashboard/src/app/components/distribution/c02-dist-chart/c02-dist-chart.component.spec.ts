import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C02DistChartComponent } from './c02-dist-chart.component';

describe('C02DistChartComponent', () => {
  let component: C02DistChartComponent;
  let fixture: ComponentFixture<C02DistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C02DistChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C02DistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
