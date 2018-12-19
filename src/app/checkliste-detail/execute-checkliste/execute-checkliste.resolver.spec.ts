import { TestBed } from '@angular/core/testing';

import { ExecuteChecklisteResolver } from './execute-checkliste.resolver';

describe('ExecuteChecklisteResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecuteChecklisteResolver = TestBed.get(ExecuteChecklisteResolver);
    expect(service).toBeTruthy();
  });
});
