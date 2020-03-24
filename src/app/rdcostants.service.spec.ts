import { TestBed } from '@angular/core/testing';

import { RDCostantsService } from './rdcostants.service';

describe('RDCostantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RDCostantsService = TestBed.get(RDCostantsService);
    expect(service).toBeTruthy();
  });
});
