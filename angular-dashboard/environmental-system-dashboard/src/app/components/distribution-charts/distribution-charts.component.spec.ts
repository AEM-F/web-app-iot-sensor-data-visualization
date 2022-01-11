import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionChartsComponent } from './distribution-charts.component';

describe('DistributionChartsComponent', () => {
  let component: DistributionChartsComponent;
  let fixture: ComponentFixture<DistributionChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributionChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
