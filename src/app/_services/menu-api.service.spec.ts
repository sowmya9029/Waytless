import { TestBed } from '@angular/core/testing';

import { MenuApiService } from './menu-api.service';

describe('MenuApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuApiService = TestBed.get(MenuApiService);
    expect(service).toBeTruthy();
  });
});
