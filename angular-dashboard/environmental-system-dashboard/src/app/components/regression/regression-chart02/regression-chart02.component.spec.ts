import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionChart02Component } from './regression-chart02.component';

describe('RegressionChart02Component', () => {
  let component: RegressionChart02Component;
  let fixture: ComponentFixture<RegressionChart02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegressionChart02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegressionChart02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
