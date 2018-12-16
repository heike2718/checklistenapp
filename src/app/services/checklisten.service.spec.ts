import { TestBed } from '@angular/core/testing';

import { ChecklistenService } from './checklisten.service';

describe('ChecklistenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistenService = TestBed.get(ChecklistenService);
    expect(service).toBeTruthy();
  });
});
