import { TestBed } from '@angular/core/testing';

import { RestaurantAPIService } from './restaurant-api.service';

describe('RestaurantAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantAPIService = TestBed.get(RestaurantAPIService);
    expect(service).toBeTruthy();
  });
});
