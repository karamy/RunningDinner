import { TestBed } from '@angular/core/testing';

import { RDToastServiceice } from './rdtoast.service';

describe('RDToastServiceice', () => {
  let service: RDToastServiceice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RDToastServiceice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
