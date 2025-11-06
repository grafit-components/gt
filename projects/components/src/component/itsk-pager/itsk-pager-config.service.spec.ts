import { TestBed } from '@angular/core/testing';

import { ItskPagerConfigService } from './itsk-pager-config.service';

describe('ItskPagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItskPagerConfigService = TestBed.inject(ItskPagerConfigService);
    expect(service).toBeTruthy();
  });
});
