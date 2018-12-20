import { TestBed } from '@angular/core/testing';

import { DataStore } from './app-data';

describe('AppstoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStore = TestBed.get(DataStore);
    expect(service).toBeTruthy();
  });
});
