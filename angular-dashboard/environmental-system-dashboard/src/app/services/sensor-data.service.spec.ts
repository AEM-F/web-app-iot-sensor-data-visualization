import { TestBed } from '@angular/core/testing';

import { SensorDataService } from './sensor-data.service';

describe('SensorDataService', () => {
  let service: SensorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
