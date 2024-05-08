import { TestBed } from '@angular/core/testing';

import { ItskIconService } from './itsk-icon.service';

describe('ItskIconService', () => {
  let service: ItskIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItskIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
