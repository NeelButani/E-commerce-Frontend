import { TestBed } from '@angular/core/testing';

import { LocalStoageService } from './local-stoage.service';

describe('LocalStoageService', () => {
  let service: LocalStoageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStoageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
