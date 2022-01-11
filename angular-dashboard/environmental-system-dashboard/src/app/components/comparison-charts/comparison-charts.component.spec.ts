import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonChartsComponent } from './comparison-charts.component';

describe('ComparisonChartsComponent', () => {
  let component: ComparisonChartsComponent;
  let fixture: ComponentFixture<ComparisonChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
