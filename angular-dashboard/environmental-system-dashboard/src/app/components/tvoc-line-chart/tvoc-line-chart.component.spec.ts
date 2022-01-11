import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvocLineChartComponent } from './tvoc-line-chart.component';

describe('TvocLineChartComponent', () => {
  let component: TvocLineChartComponent;
  let fixture: ComponentFixture<TvocLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvocLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvocLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
