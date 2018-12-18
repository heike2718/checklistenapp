import { TestBed } from '@angular/core/testing';

import { AppstoreService } from './appstore.service';

describe('AppstoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppstoreService = TestBed.get(AppstoreService);
    expect(service).toBeTruthy();
  });
});
