import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvocVsC02ChartComponent } from './tvoc-vs-c02-chart.component';

describe('TvocVsC02ChartComponent', () => {
  let component: TvocVsC02ChartComponent;
  let fixture: ComponentFixture<TvocVsC02ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvocVsC02ChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvocVsC02ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
