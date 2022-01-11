import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvocDistChartComponent } from './tvoc-dist-chart.component';

describe('TvocDistChartComponent', () => {
  let component: TvocDistChartComponent;
  let fixture: ComponentFixture<TvocDistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvocDistChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvocDistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
