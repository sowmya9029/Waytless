import { TestBed } from '@angular/core/testing';

import { RegisterApiService } from './register-api.service';

describe('RegisterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterApiService = TestBed.get(RegisterApiService);
    expect(service).toBeTruthy();
  });
});
