import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionChart01Component } from './regression-chart01.component';

describe('RegressionChart01Component', () => {
  let component: RegressionChart01Component;
  let fixture: ComponentFixture<RegressionChart01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegressionChart01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegressionChart01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
