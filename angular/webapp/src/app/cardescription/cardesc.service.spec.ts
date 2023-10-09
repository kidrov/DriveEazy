import { TestBed } from '@angular/core/testing';

import { cardescService } from './cardesc.service';

describe('CardescService', () => {
  let service: cardescService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cardescService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
