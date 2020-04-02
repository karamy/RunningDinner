import { TestBed } from '@angular/core/testing';

import { RDConstantsService } from './rdcostants.service';

describe('RDConstantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RDConstantsService = TestBed.get(RDConstantsService);
    expect(service).toBeTruthy();
  });
});
