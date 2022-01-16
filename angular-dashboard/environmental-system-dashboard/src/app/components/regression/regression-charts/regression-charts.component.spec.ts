import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionChartsComponent } from './regression-charts.component';

describe('RegressionChartsComponent', () => {
  let component: RegressionChartsComponent;
  let fixture: ComponentFixture<RegressionChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegressionChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegressionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
