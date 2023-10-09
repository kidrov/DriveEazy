import { TestBed } from '@angular/core/testing';

import { CarlistService } from './carlist.service';

describe('CarlistService', () => {
  let service: CarlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
