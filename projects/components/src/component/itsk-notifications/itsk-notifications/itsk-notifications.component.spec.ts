import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskNotificationsComponent } from './itsk-notifications.component';

describe('ItskNotificationsComponent', () => {
  let component: ItskNotificationsComponent;
  let fixture: ComponentFixture<ItskNotificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskNotificationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
