import { TestBed } from '@angular/core/testing';

import { ItskNotificationService } from './itsk-notification.service';

describe('ItskNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItskNotificationService = TestBed.get(ItskNotificationService);
    expect(service).toBeTruthy();
  });
});
