import { TestBed } from '@angular/core/testing';

import { RDSpinnerService } from './rdspinner.service';

describe('RDSpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RDSpinnerService = TestBed.get(RDSpinnerService);
    expect(service).toBeTruthy();
  });
});
