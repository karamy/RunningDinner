import { TestBed } from '@angular/core/testing';

import { RdstorageService } from './rdstorage.service';

describe('RdstorageService', () => {
  let service: RdstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
