import { TestBed } from '@angular/core/testing';

import { DinnerService } from './dinner.service';

describe('DinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinnerService = TestBed.get(DinnerService);
    expect(service).toBeTruthy();
  });
});
