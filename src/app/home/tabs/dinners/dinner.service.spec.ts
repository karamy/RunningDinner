import { TestBed } from '@angular/core/testing';

import { DinnersService } from './dinners.service';

describe('DinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinnersService = TestBed.get(DinnersService);
    expect(service).toBeTruthy();
  });
});
