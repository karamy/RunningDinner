import { TestBed } from '@angular/core/testing';

import { FoodAllergiesService } from './food-allergies.service';

describe('FoodAllergiesService', () => {
  let service: FoodAllergiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodAllergiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
