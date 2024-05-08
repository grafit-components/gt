import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskNotificationItemComponent } from './itsk-notification-item.component';

describe('ItskNotificationItemComponent', () => {
  let component: ItskNotificationItemComponent;
  let fixture: ComponentFixture<ItskNotificationItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskNotificationItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
