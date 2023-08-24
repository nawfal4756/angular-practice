import { TestBed } from '@angular/core/testing';

import { CityapiService } from './cityapi.service';

describe('CityapiService', () => {
  let service: CityapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
