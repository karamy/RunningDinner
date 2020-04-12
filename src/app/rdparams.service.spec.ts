import { TestBed } from '@angular/core/testing';

import { RDParamsService } from './rdparams.service';

describe('RDParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RDParamsService = TestBed.get(RDParamsService);
    expect(service).toBeTruthy();
  });
});
