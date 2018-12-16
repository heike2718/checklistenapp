import { TestBed } from '@angular/core/testing';

import { ChecklisteDetailResolver } from './checkliste-detail-resolver.service';

describe('ChecklisteDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklisteDetailResolver = TestBed.get(ChecklisteDetailResolver);
    expect(service).toBeTruthy();
  });
});
