import { TestBed } from '@angular/core/testing';

import { ItskGridService } from './itsk-grid.service';

describe('ItskGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItskGridService = TestBed.get(ItskGridService);
    expect(service).toBeTruthy();
  });
});
