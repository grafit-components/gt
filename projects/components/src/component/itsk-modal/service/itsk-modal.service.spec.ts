import { TestBed } from '@angular/core/testing';

import { ItskModalService } from './itsk-modal.service';

describe('ItskModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItskModalService = TestBed.get(ItskModalService);
    expect(service).toBeTruthy();
  });
});
